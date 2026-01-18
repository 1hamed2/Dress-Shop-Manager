import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Edit({ staffCommission, thisMonthCommissions, previousMonthCommissions, staffs }) {

    console.log("Edit Staff Commission", staffCommission);


    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        staff_id: staffCommission.staff_id,
        month: staffCommission.month,
        total_commission: staffCommission.total_commission,
        _method: 'PUT',

    });

    const handleStaffSelect = (id) => {

        setData("staff_id", id);

    };

    const handleMonthSelect = (type) => {


        if (!data.staff_id) return;

        let commission = 0;

        if (type === "this_month") {
            commission = thisMonthCommissions[data.staff_id]?.total ?? 0;
        } else {
            commission = previousMonthCommissions[data.staff_id]?.total ?? 0;

        }

        setData("total_commission", commission);
    }


    const submit = (e) => {
        e.preventDefault();

        post(route('staff-commissions.update', staffCommission));
    }


    return (
        <>

            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Staff Commission's Information</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Update {staffCommission.name} account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="staff_id" value="Staff Name" />

                                    <SelectInput
                                        id="staff_id"
                                        className="mt-1 block w-full"
                                        value={data.staff_id}
                                        onChange={(e) => handleStaffSelect(e.target.value)}
                                        required
                                        isFocused
                                    >
                                        <option>{staffCommission.staff.name}</option>
                                        <option disabled>select staff</option>
                                        {staffs.data.map((staff) => (
                                            <option key={staff.id} value={staff.id}>{staff.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.staff_id} />

                                </div>

                                <div>

                                    <SelectInput

                                        onChange={(e) => handleMonthSelect(e.target.value)}

                                        isFocused
                                    >
                                        <option value="">Select one</option>
                                        <option value="this_month">This Month</option>
                                        <option value="previous_month">Previous Month</option>
                                    </SelectInput>
                                    <InputLabel htmlFor="total_commission" value="Total Commission" />

                                    <TextInput
                                        id="total_commission"
                                        type="number"
                                        readOnly
                                        className="mt-1 block w-full"
                                        value={data.total_commission}
                                        onChange={(e) => setData('total_commission', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="total_commission"
                                    />

                                    <InputError className="mt-2" message={errors.total_commission} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="month" value="Month" />
                                    <TextInput
                                        type="month"
                                        value={data.month}
                                        readOnly

                                    />
                                    <TextInput
                                        id="month"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.month}
                                        onChange={(e) => setData('month', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.month} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>

            </Admin>
        </>
    )
}