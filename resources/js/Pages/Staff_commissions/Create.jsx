import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Create({ thisMonthCommissions, previousMonthCommissions, staffs }) {




    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        staff_id: "",
        month: "",
        total_commission: "",
    });

    const handleStaffSelect = (id) => {

        setData("staff_id", id);

    };

    const handleMonthSelect = (type) => {
        setData("month", type);

        if (!data.staff_id) return;

        let commission = 0;

        if (type === "this_month") {
            commission = thisMonthCommissions[data.staff_id]?.total ?? 0;
        } else {
            commission = previousMonthCommissions[data.staff_id]?.total ?? 0;

        }

        setData("total_commission", commission);
    }

    const handleSelect = (e) => {
        const selectedValue = e.target.value;

        setData("month", selectedValue);

        if (selectedValue === "this_month") {
            setData("total_commission", thisMonthCommissions);
        }

        if (selectedValue === "previous_month") {
            setData("total_commission", previousMonthCommissions);
        }
    };

    const submit = (e) => {
        e.preventDefault();


        post(route('staff-commissions.store'));

    };

    return (
        <>
            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add Staff Commission</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Enter account's profile information.
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
                                        <option>select staff</option>
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
                                        required
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