import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Create({ companies }) {



    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: "",
        phone: "",
    });

    const submit = (e) => {
        e.preventDefault();


        post(route('staff.store'));

    };

    return (
        <>
            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add Staff</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Enter account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="phone" value="Phone" />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="phone"
                                    />

                                    <InputError className="mt-2" message={errors.phone} />
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