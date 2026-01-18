import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Admin from "@/Pages/Admin";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";

export default function Edit({ sale, products, staffs }) {

    console.log("Edit Sales", sale);


    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        product_id: sale.product_id,
        staff_id: sale.staff_id,
        quantity: sale.quantity,
        price_per_unit: sale.price_per_unit,
        _method: 'PUT',

    });


    const submit = (e) => {
        e.preventDefault();

        post(route('sales.update', sale));
    }


    return (
        <>

            <Admin>
                <div className="py-12 overflow-y-auto ">
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 flex flex-col items-center">
                        <section className="max-w-xl w-full">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{sale.product?.name}'s Information</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Update {sale.product?.name} account's profile information.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="product_id" value="Product" />

                                    <SelectInput
                                        id="product_id"
                                        className="mt-1 block w-full"
                                        value={data.product_id}
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        required
                                        isFocused
                                    >
                                        <option>{sale.product.name}</option>
                                        <option disabled>select product</option>
                                        {products.data.map((product) => (
                                            <option key={product.id} value={product.id}>{product.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.product_id} />

                                </div>

                                <div>
                                    <InputLabel htmlFor="staff_id" value="Staff" />

                                    <SelectInput
                                        id="staff_id"
                                        className="mt-1 block w-full"
                                        value={data.staff_id}
                                        onChange={(e) => setData('staff_id', e.target.value)}
                                        required
                                        isFocused
                                    >
                                        <option>{sale.staff.name}</option>
                                        <option disabled>select staff</option>
                                        {staffs.data.map((staff) => (
                                            <option key={staff.id} value={staff.id}>{staff.name}</option>

                                        ))}
                                    </SelectInput>

                                    <InputError className="mt-2" message={errors.staff_id} />

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
                                    <InputLabel htmlFor="price_per_unit" value="Price per unit" />

                                    <TextInput
                                        id="price_per_unit"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.price_per_unit}
                                        onChange={(e) => setData('price_per_unit', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="price_per_unit"
                                    />

                                    <InputError className="mt-2" message={errors.price_per_unit} />
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