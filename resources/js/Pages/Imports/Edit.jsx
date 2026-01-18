import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Edit({ importss, companies }) {

    console.log("Edit Product", importss);


    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        company_id: importss.company_id,
        total_cost: importss.total_cost,
        _method: 'PUT',

    });


    const submit = (e) => {
        e.preventDefault();

        post(route('imports.update', importss));
    }


    return (
        <>

            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{importss.name}'s Information</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Update {importss.name} account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="company_id" value="Compamy" />

                                    <SelectInput
                                        id="company_id"
                                        className="mt-1 block w-full"
                                        value={data.company_id}
                                        onChange={(e) => setData('company_id', e.target.value)}
                                        required
                                        isFocused
                                    >
                                        <option>{importss.company.name}</option>
                                        <option disabled>select company</option>
                                        {companies.data.map((company) => (
                                            <option key={company.id} value={company.id}>{company.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.company_id} />

                                </div>

                                <div>
                                    <InputLabel htmlFor="total_cost" value="Total Cost" />

                                    <TextInput
                                        id="total_cost"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.total_cost}
                                        onChange={(e) => setData('total_cost', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="total_cost"
                                    />

                                    <InputError className="mt-2" message={errors.total_cost} />
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