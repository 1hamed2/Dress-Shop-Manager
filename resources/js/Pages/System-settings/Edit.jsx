import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Edit({ setting }) {

    console.log("Edit setting", setting);


    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        commission_per_piece: setting.commission_per_piece,
        currency: setting.currency,
        tax_rate: setting.tax_rate,
        _method: 'PUT',

    });


    const submit = (e) => {
        e.preventDefault();

        post(route('system-settings.update', setting));
    }


    return (
        <>

            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Setting</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Update Settings.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">


                                <div>
                                    <InputLabel htmlFor="commission_per_piece" value="Name" />

                                    <TextInput
                                        id="commission_per_piece"
                                        className="mt-1 block w-full"
                                        value={data.commission_per_piece}
                                        onChange={(e) => setData('commission_per_piece', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="commission_per_piece"
                                    />

                                    <InputError className="mt-2" message={errors.commission_per_piece} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="currency" value="Currency" />

                                    <TextInput
                                        id="currency"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.currency}
                                        onChange={(e) => setData('currency', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="currency"
                                    />

                                    <InputError className="mt-2" message={errors.currency} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="tax_rate" value="Sale price" />

                                    <TextInput
                                        id="tax_rate"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.tax_rate}
                                        onChange={(e) => setData('tax_rate', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="tax_rate"
                                    />

                                    <InputError className="mt-2" message={errors.tax_rate} />
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