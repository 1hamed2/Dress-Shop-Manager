import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Create({ }) {



    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        title: "",
        amount: "",
    });

    const submit = (e) => {
        e.preventDefault();


        post(route('expenses.store'));

    };

    return (
        <>
            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add Expense</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Enter account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="title" value="Title" />

                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
                                    />

                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="amount" value="Amount" />

                                    <TextInput
                                        id="amount"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="amount"
                                    />

                                    <InputError className="mt-2" message={errors.amount} />
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