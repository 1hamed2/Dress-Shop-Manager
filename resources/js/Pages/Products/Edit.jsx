import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";


export default function Edit({ product, companies }) {

    console.log("Edit Product", product);


    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        company_id: product.company_id,
        name: product.name,
        cost_price: product.cost_price,
        sale_price: product.sale_price,
        stock: product.stock,
        _method: 'PUT',

    });


    const submit = (e) => {
        e.preventDefault();

        post(route('products.update', product));
    }


    return (
        <>

            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{product.name}'s Information</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Update {product.name} account's profile information.
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
                                        <option>{product.company.name}</option>
                                        <option disabled>select company</option>
                                        {companies.data.map((company) => (
                                            <option key={company.id} value={company.id}>{company.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.company_id} />

                                </div>

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
                                    <InputLabel htmlFor="cost_price" value="Cost price" />

                                    <TextInput
                                        id="cost_price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.cost_price}
                                        onChange={(e) => setData('cost_price', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="cost_price"
                                    />

                                    <InputError className="mt-2" message={errors.cost_price} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="sale_price" value="Sale price" />

                                    <TextInput
                                        id="sale_price"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.sale_price}
                                        onChange={(e) => setData('sale_price', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="sale_price"
                                    />

                                    <InputError className="mt-2" message={errors.sale_price} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="stock" value="Stock" />

                                    <TextInput
                                        id="stock"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="stock"
                                    />

                                    <InputError className="mt-2" message={errors.stock} />
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