import { setError } from "@/features/slices/errorSlices"
import { CREATE_PRODUCT_ENDPOINT } from "@/utils/constants/endpoints"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


type IAddProductProps = {
    isOpen: boolean,
    handleClose: (x: boolean) => void
}

const AddProduct = (props: IAddProductProps) => {
    const { isOpen, handleClose } = props
    const [formData, setFormData] = useState<FoodProductForm>({
        title: '',
        brand: '',
        originalPrice: 0,
        discountedPrice: 0,
        quantity: 0,
        image: [],
        hoverImage: [],
        category: '',
        description: '',
    });
    const validate = (validateData: FoodProductForm) => {
        const errors: Partial<FoodProductForm> = {};
        if (!validateData.title) {
            errors.title = 'title is required';
        }
        return errors;
    };
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

    };
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        console.log("file: ", files)
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            setFormData(prevData => ({
                ...prevData,
                image: [...prevData.image, ...newFiles]
            }));
        }
    };
    const dispatch = useDispatch();
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            const data = {
                ...formData,

            };
            const response = await axios.post(CREATE_PRODUCT_ENDPOINT, data);
            if(response.status == 201){
                handleClose(false);
                dispatch(setError({ status: 'success', message: 'Create product successfully!' }));
            } else {
                dispatch(setError({ status: 'danger', message: 'Create product failed!' }));
            }
        }

    }
    return (
        isOpen && (
            <>
                <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"
                    id="productModal">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transhtmlForm transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg font-medium text-gray-900" id="modal-title">Thêm sản phẩm mới</h3>
                                <div className="mt-3">
                                    <form onSubmit={onSubmit} data-parsley-validate>
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                Tên sản phẩm
                                            </label>
                                            <input 
                                                onChange={handleChange}
                                                type="text" 
                                                id="title" 
                                                name="title"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Mô tả
                                            </label>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                           
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Giá gốc
                                                    (VNĐ)</label>
                                                <input onChange={handleChange} type="number" id="originalPrice" name="originalPrice"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                            </div>
                                            <div>
                                                <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700">Giá mới
                                                    (VNĐ)</label>
                                                <input onChange={handleChange} type="number" id="discountedPrice" name="discountedPrice"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Số
                                                lượng tồn kho</label>
                                            <input onChange={handleChange} type="number" id="quantity" name="quantity"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                Danh mục</label>
                                            <select id="category" name="category" onChange={handleSelectChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                                <option key="PS1" value="PS1">Thức ăn</option>
                                                <option key="PS2" value="PS2">Phụ kiện</option>
                                                <option key="PS3" value="PS3">Đồ chơi</option>
                                                <option key="PS4" value="PS4">Đồ dùng</option>
                                                <option key="PS5" value="PS5">Chó</option>
                                                <option key="PS6" value="PS6">Mèo</option>
                                                <option key="PS7" value="PS7">Động vật khác</option>
                                                <option key="PS8" value="PS8">Thiết bị thông minh</option>
                                                <option key="PS9" value="PS9">New</option>
                                                <option key="PS10" value="PS10">Best seller</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                                Brand
                                            </label>
                                            <input onChange={handleChange} type="text" id="brand" name="brand"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                                            <div
                                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <div className="flex text-sm text-gray-600">
                                                        <label htmlFor="image"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                            <span>Tải lên hình ảnh</span>
                                                            <input onChange={handleFileChange} id="image" name="image" type="file"/>
                                                        </label>
                                                        <p className="pl-1">hoặc kéo thả</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button type="submit"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                Lưu
                                            </button>
                                            <button type="button"
                                                onClick={() => { handleClose(false) }}
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                Hủy
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    )
}
export default AddProduct 