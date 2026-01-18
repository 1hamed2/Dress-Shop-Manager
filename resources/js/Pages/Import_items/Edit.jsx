import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Edit({ importItem, imports, products }) {

    console.log("Edit ImportItem", importItem);


    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        import_id: importItem.import_id,
        product_id: importItem.product_id,
        quantity: importItem.quantity,
        cost_per_unit: importItem.cost_per_unit,
        _method: 'PUT',

    });


    const submit = (e) => {
        e.preventDefault();

        post(route('import-items.update', importItem));
    }


    return (
        <>

            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{importItem.product?.name}'s Information</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Update {importItem.name} account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="import_id" value="Company name" />

                                    <SelectInput
                                        id="import_id"
                                        className="mt-1 block w-full"
                                        value={data.import_id}
                                        onChange={(e) => setData('import_id', e.target.value)}
                                        required
                                        isFocused
                                    >
                                        <option>{importItem.import.company.name}</option>
                                        <option disabled>select import</option>
                                        {imports.data.map((importss) => (
                                            <option key={importss.id} value={importss.id}>{importss.company.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.import_id} />

                                </div>
                                <div>
                                    <InputLabel htmlFor="product_id" value="Product Name" />

                                    <SelectInput
                                        id="product_id"
                                        className="mt-1 block w-full"
                                        value={data.product_id}
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        required
                                        isFocused
                                    >
                                        <option>{importItem.product.name}</option>
                                        <option disabled>select product</option>
                                        {products.data.map((product) => (
                                            <option key={product.id} value={product.id}>{product.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.product_id} />

                                </div>

                                <div>
                                    <InputLabel htmlFor="quantity" value="Quantity" />

                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="quantity"
                                    />

                                    <InputError className="mt-2" message={errors.quantity} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cost_per_unit" value="Cost per unit" />

                                    <TextInput
                                        id="cost_per_unit"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.cost_per_unit}
                                        onChange={(e) => setData('cost_per_unit', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="cost_per_unit"
                                    />

                                    <InputError className="mt-2" message={errors.cost_per_unit} />
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