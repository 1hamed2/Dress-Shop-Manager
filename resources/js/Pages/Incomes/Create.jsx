import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Create({ previousMonthIncome, thisMonthIncome }) {



    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        month: "",
        amount: "",
    });

    const handleSelect = (e) => {
        const selectedValue = e.target.value;

        setData("month", selectedValue);

        if (selectedValue === "this_month") {
            setData("amount", thisMonthIncome);
        }

        if (selectedValue === "previous_month") {
            setData("amount", previousMonthIncome);
        }
    };

    const submit = (e) => {
        e.preventDefault();


        post(route('incomes.store'));

    };

    return (
        <>
            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add Income</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Enter account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">


                                <div>
                                    <SelectInput
                                        onChange={handleSelect}
                                        required
                                        isFocused
                                    >
                                        <option value="">Select one</option>
                                        <option value="this_month">This Month</option>
                                        <option value="previous_month">Previous Month</option>
                                    </SelectInput>
                                    <InputLabel htmlFor="amount" value="Amount" />

                                    <TextInput
                                        id="amount"
                                        type="number"
                                        readOnly
                                        className="mt-1 block w-full"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="amount"
                                    />

                                    <InputError className="mt-2" message={errors.amount} />
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