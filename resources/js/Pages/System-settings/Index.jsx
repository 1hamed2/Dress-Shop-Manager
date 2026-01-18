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



export default function SystemSettings({ settings, queryParams, success, updateMsg, deleteMsg }) {


    queryParams = queryParams || "";

    console.log("settings", settings);



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



        router.get(route('system-settings.index', updatedParams))
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



    const [settingDlt, setSettingDlt] = useState(false);
    const [selectedSetting, setSelectedSetting] = useState(null);


    const openModal = (setting) => {
        setSettingDlt(true);
        setSelectedSetting(setting);

    }

    const closeModal = () => {
        setSettingDlt(false);
        setSelectedSetting(null);


    }

    const deleteSetting = (selectedSetting) => {

        // if (!window.confirm('Are you sure you want to delete this setting?')) {
        //     return;
        // }
        if (!selectedSetting || !selectedSetting.id) {
            alert("Error: No setting selected");
            return;
        }

        console.log("Deleting setting:", selectedSetting);

        router.delete(route('system-settings.destroy', selectedSetting.id));

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
                                            <Link href={route('system-settings.create')} className="flex items-center">

                                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add setting
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                    <div className="w-full md:w-max">
                                        <Typography variant="h5" color="blue-gray">
                                            Settings list
                                        </Typography>
                                        <Typography color="gray" className="mt-1 font-normal">
                                            See information about all settings
                                        </Typography>
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
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Commission per piece</h2>
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortChanged("commission_per_piece")}
                                                        name="commission_per_piece"
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
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Currency</h2>

                                                </Typography>
                                            </th>
                                            <th
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="flex items-center justify-between gap-2 font-bold leading-none"
                                                >
                                                    <h2 className="bg-slate-800  text-white p-3 rounded">Tax rate</h2>
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
                                        {settings.data.map(
                                            (setting) => {
                                                const isLast = setting === settings.length - 1;
                                                const classes = isLast
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-50";

                                                return (
                                                    <tr key={setting.id}>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {setting.id}

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
                                                                        {setting.commission_per_piece}

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
                                                                    {setting.currency}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {setting.tax_rate}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <div>
                                                                <Tooltip content="Delete User">
                                                                    <IconButton onClick={(e) => openModal(setting)} variant="text">
                                                                        <TrashIcon className="h-6 w-6 text-red-500" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip content="Edit User">
                                                                    <IconButton variant="text">
                                                                        <Link href={route('system-settings.edit', setting)}>
                                                                            <PencilIcon className="h-6 w-6" />
                                                                        </Link>
                                                                    </IconButton>
                                                                </Tooltip>

                                                            </div>



                                                        </td>
                                                    </tr>

                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                            </CardBody>
                            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    Page {settings.meta.current_page} of {settings.meta.last_page}
                                </Typography>
                                <div className="flex gap-2">
                                    {settings.meta.links.map((link) => (
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
                <Modal show={settingDlt} onClose={closeModal}>
                    <div className="p-6 pointer-events-auto">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete this setting?
                        </h2>


                        <div className="mt-6 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                            <DangerButton
                                onClick={() => deleteSetting(selectedSetting)} className="ms-3">
                                Delete Setting
                            </DangerButton>
                        </div>
                    </div>
                </Modal>
            </Admin>
        </>
    )
}