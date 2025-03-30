import { DashboardLayout, EmptyState, Loader, PageWrapper, Paginator, PatientList } from "@/app/components";
import { useAuth, useLayout } from "@/app/context";
import { PatientInterface } from "@/app/intefaces";
import { Meta } from "@/app/intefaces/PaginatorInterface";
import { routeNames } from "@/app/routes";
import { PatientService } from "@/app/services";
import { PlusIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

export default function Patients() {
  const TITLE_PAGE = "Pacientes";
  const DEFAULT_NUM_PAGE = 1;
  const messageOnloading = "Cargando pacientes";
  const { setTitlePage } = useLayout();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingOnTable, setFetchingOnTable] = useState<boolean>(false);
  const [hasDataInFirstFetch, setHasDataInFirstFetch] = useState<boolean>(true);
  const [findWassSuccess, setFindWassSuccess] = useState<boolean>(true);
  const [patients, setPatients] = useState<PatientInterface[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const { user } = useAuth()
  const router = useRouter();


  useEffect(() => {
    setTitlePage(TITLE_PAGE);
    loadPatients();
  }, [])

  useEffect(() => {
    if (!loading && patients.length == 0) {
      setHasDataInFirstFetch(false)
    }
  }, [loading])

  useEffect(() => {
    if (!search && patients.length < 1) {
      loadPatients(DEFAULT_NUM_PAGE, true)
    } else {
      fitlerQueryPatients()
    }

  }, [search])

  useEffect(() => {
    if (!findWassSuccess) {
      loadPatients(DEFAULT_NUM_PAGE, true);
    }
  }, [findWassSuccess])


  const fitlerQueryPatients = async () => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone.includes(search) ||
        patient.document.includes(search) ||
        patient.email.includes(search)
    );
    setPatients(filtered);

    if (!filtered.length) {
      setFindWassSuccess(false)
    } else {
      setFindWassSuccess(true);
    }
  }

  const loadPatients = async (page?: number, onTable?: boolean) => {
    try {
      if (!onTable) {
        setLoading(true);
      } else {
        setFetchingOnTable(true)
      }
      const { data, meta } = await PatientService.listMyPatients(page, search);
      setPatients(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error fetching availability", error);
    } finally {
      if (!onTable) {
        setLoading(false);
      } else {
        setFetchingOnTable(false)
      }
    }
  };

  const paginatePatientsOnTable = async (page: number) => await loadPatients(page, true)


  const handleEdit = (e: MouseEvent<HTMLButtonElement>, patientId: number) => {
    e.preventDefault()
    router.push(`/${user?.role}${routeNames.patients}/edit/${patientId}`)
  }

  const handleRemove = (e: MouseEvent<HTMLButtonElement>, patientId: number) => {
    console.log(patientId)
  }


  if (loading) return <Loader message={messageOnloading} />

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Pacientes</h1>

            {/* 🔹 Botón SIEMPRE visible */}
            <Link href={`/${user?.role}/patients/create`}>
              <button className="btn-primary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Agregar Paciente
              </button>
            </Link>
          </div>

          {!hasDataInFirstFetch ? (
            <EmptyState />
          ) : (
            <>
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              />
              <PatientList items={patients} fetching={fetchingOnTable} actions={{ onEdit: handleEdit, onRemove: handleRemove }} />
              {meta && <Paginator meta={meta} onPageChange={paginatePatientsOnTable} />}
            </>
          )}



        </div>

      </PageWrapper>
    </DashboardLayout >
  )
}
