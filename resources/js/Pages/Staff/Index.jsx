import Admin from "@/Pages/Admin";
import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";



export default function Staff({ staffs, queryParams, success, updateMsg, deleteMsg }) {


    queryParams = queryParams || "";
    const [searchQuery, setSearchQuery] = useState();

    console.log("staffs", staffs);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        const updatedParams = { ...queryParams };

        if (/^\d+$/.test(searchQuery)) {

            updatedParams.id = searchQuery;
            delete updatedParams.name;
        } else {

            updatedParams.name = searchQuery;
            delete updatedParams.id;
        }


        router.get(route('staff.index', updatedParams));
    };






    const sortChanged = (name) => {

        const updatedParams = { ...queryParams };


        if (name === queryParams.sort_field) {
            console.log("passed suckjdfhgllyy");
            if (updatedParams.sort_direction === "desc") {
                updatedParams.sort_direction = "asc";
            } else {
                updatedParams.sort_direction = "desc";
            }
        } else {
            updatedParams.sort_field = name;
            updatedParams.sort_direction = "desc"
        }



        router.get(route('staff.index', updatedParams))
    }

    const [visible, setVisible] = useState(!!success || !!deleteMsg || !!updateMsg);

    useEffect(() => {
        if (success || deleteMsg || updateMsg) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000)

            return () => clearTimeout(timer);
        }
    }, [success, deleteMsg, updateMsg]);



    const [staffDlt, setStaffDlt] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);


    const openModal = (staff) => {
        setStaffDlt(true);
        setSelectedStaff(staff);

    }

    const closeModal = () => {
        setStaffDlt(false);
        setSelectedStaff(null);


    }

    const deleteStaff = (selectedStaff) => {

        // if (!window.confirm('Are you sure you want to delete this staff?')) {
        //     return;
        // }
        if (!selectedStaff || !selectedStaff.id) {
            alert("Error: No staff selected");
            return;
        }

        console.log("Deleting staff:", selectedStaff);

        router.delete(route('staff.destroy', selectedStaff.id));

        closeModal();

    }

    return (
        <>
            <Admin>

                {success && (
                    <div className={`bg-emerald-500 py-2 px-4 rounded text-gray-100 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                        {success}

                    </div>
                )}

                {deleteMsg && (
                    <div className={`bg-emerald-500 py-2 px-4 rounded text-gray-100 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                        {deleteMsg}
                    </div>
                )}

                {updateMsg && (
                    <div className={`bg-emerald-500 py-2 px-4 rounded text-gray-100 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                        {updateMsg}
                    </div>
                )}

                <div className="flex flex-wrap">
                    <div className="w-full mb-12 px-4">
                        <Card className="h-full w-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-4 flex items-center justify-between gap-8">
                                    <div>

                                    </div>
                                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                        <Button className="flex items-center gap-3 bg-gray-900" size="sm">
                                            <Link href={route('staff.create')} className="flex items-center">

                                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add staff
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                    <div className="w-full md:w-max">
                                        <Typography variant="h5" color="blue-gray">
                                            Staff list
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal">
                                            See information about all staffs
                                        </Typography>
                                    </div>
                                    <div className="w-full md:w-72">
                                        <div class="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={handleInputChange}
                                                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                                placeholder="Search by id or name"
                                                onKeyDown={handleKeyDown}
                                            />
                                            <button
                                                class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                                onClick={handleSearch}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                                                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                                                </svg>

                                                Search
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-scroll px-0">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr className="bg-slate-800">
                                            <th
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center justify-between gap-2 font-bold leading-none"
                                                >
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Id</h2>
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortChanged("id")}
                                                        name="id"
                                                        strokeWidth={2}
                                                        className="h-4 w-4 text-white"
                                                    />
                                                </Typography>
                                            </th>
                                            <th
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center justify-between gap-2 font-bold leading-none"
                                                >
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Name</h2>
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortChanged("name")}
                                                        name="name"
                                                        strokeWidth={2}
                                                        className="h-4 w-4 text-white"
                                                    />
                                                </Typography>
                                            </th>
                                            <th
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center justify-between gap-2 font-bold leading-none"
                                                >
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Phone</h2>
                                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4 text-white" />
                                                </Typography>
                                            </th>
                                            <th
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center justify-between gap-2 font-bold leading-none"
                                                >
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Created at</h2>
                                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4 text-white" />
                                                </Typography>
                                            </th>

                                            <th
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center justify-between gap-2 font-bold leading-none"
                                                >
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Action</h2>
                                                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4 text-white" />
                                                </Typography>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffs.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-6">
                                                    <div className="flex justify-center">
                                                        <p className="inline-flex items-center rounded-md border border-transparent bg-red-600
                                                            px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white 
                                                            transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2
                                                            focus:ring-red-500 focus:ring-offset-2 active:bg-red-700"

                                                        >
                                                            No Staff found !!
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            staffs.data.map(
                                                (staff) => {
                                                    const isLast = staff === staffs.length - 1;
                                                    const classes = isLast
                                                        ? "p-4"
                                                        : "p-4 border-b border-blue-gray-50";

                                                    return (
                                                        <tr key={staff.id}>
                                                            <td className={classes}>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex flex-col">
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {staff.id}

                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex flex-col">
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal"
                                                                        >
                                                                            {staff.name}

                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {staff.phone}
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {staff.created_at}
                                                                </Typography>
                                                            </td>
                                                            <td className={classes}>
                                                                <div>
                                                                    <Tooltip content="Delete User">
                                                                        <IconButton onClick={(e) => openModal(staff)} variant="text">
                                                                            <TrashIcon className="h-6 w-6 text-red-500" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip content="Edit User">
                                                                        <IconButton variant="text">
                                                                            <Link href={route('staff.edit', staff)}>
                                                                                <PencilIcon className="h-6 w-6" />
                                                                            </Link>
                                                                        </IconButton>
                                                                    </Tooltip>

                                                                </div>



                                                            </td>
                                                        </tr>

                                                    );
                                                },
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    Page {staffs.meta.current_page} of {staffs.meta.last_page}
                                </Typography>
                                <div className="flex gap-2">
                                    {staffs.meta.links.map((link) => (
                                        <Link
                                            preserveScroll
                                            href={link.url || ""}
                                            key={link.label}
                                            className={
                                                "inline-block py-2 px-3 rounded-lg  border-t border-blue-gray-50" +
                                                (link.active ? "bg-gray-950 " : " ") +
                                                (!link.url ? "text-gray-500 cursor-not-allowed " : "hover:bg-gray-950 hover:text-gray-100")
                                            }
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        >

                                        </Link>
                                    ))}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <Modal show={staffDlt} onClose={closeModal}>
                    <div className="p-6 pointer-events-auto">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete this staff?
                        </h2>


                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <DangerButton
                                onClick={() => deleteStaff(selectedStaff)} className="ms-3">
                                Delete Staff
                            </DangerButton>
                        </div>
                    </div>
                </Modal>
            </Admin>
        </>
    )
}