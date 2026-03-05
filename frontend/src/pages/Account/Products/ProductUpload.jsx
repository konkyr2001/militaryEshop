import { useRef, useState } from "react";
import { createNewProduct } from "../../../services/products";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";

function ProductUpload({ currentUser, setActiveTab, setProductAlert }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [description, setDescription] = useState('');
    const [fileDrag, setFileDrag] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileRef = useRef(null);
    const [errors, setErrors] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();
        const object = {
            title: title.trim(),
            price: price.trim(),
            discount: discount.trim(),
            totalPrice: totalPrice,
            description: description.trim(),
            file: fileName
        };
        const newErrors = {};
        if (!object.title) newErrors.title = true;
        if (!object.price) newErrors.price = true;
        if (!object.file) newErrors.file = true;
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const product = {
            title: object.title,
            creator: currentUser.id,
            oldPrice: discount > 0 ? object.price : '',
            currentPrice: object.totalPrice,
            discount: object.discount > 0 ? object.discount : '',
            description: object.description,
            iconName: fileName,
            file: fileRef.current.files[0]
        }

        const newProduct = await createNewProduct(product, currentUser.id);
        if (newProduct.found) {
            setActiveTab("PRODUCTS");
            setProductAlert("Your new product is now live!");
        }
    }

    function handleTitle(value) {
        setTitle(value);
        setErrors((prev) => ({
            ...prev,
            title: false
        }))
    }

    function handlePrice(value) {
        const regex = /^[0-9]+(,[0-9]*)?$/;
        if (value === "" || regex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                price: false
            }))
            setPrice(value);
            value = Number(value.replace(",", "."));
            const totalPrice = value - (value) * discount / 100;
            setTotalPrice(isNaN(totalPrice) ? '0' : totalPrice);
        }
    }

    function handleDiscount(value) {
        const regex = /^(100|[1-9]?[0-9])$/;
        if (value === "" || regex.test(value)) {
            setDiscount(value);
            const newPrice = Number(price.replace(",", "."));
            const totalPrice = newPrice - (newPrice) * value / 100;
            setTotalPrice(isNaN(totalPrice) ? '0' : totalPrice);
        }
    }

    function handleDrag(event, value) {
        event.preventDefault();
        setFileDrag(value);
    }

    function handleDrop(e, value) {
        e.preventDefault();
        setFileDrag(value);
        const droppedFiles = e.dataTransfer.files;
        if (!droppedFiles || droppedFiles.length != 1) return;
        if (droppedFiles[0].type != "image/png" && droppedFiles[0].type != "image/jpeg") return;
        fileRef.current.files = droppedFiles;
        onFileChange();
    }

    function onFileChange() {
        try {
            const folders = fileRef.current.value.split("\\");
            const name = folders[folders.length - 1].split(".");
            name[1] = name[1].toLowerCase();
            const file = name[0] + '.' + name[1];
            setErrors((prev) => ({
                ...prev,
                file: false
            }))
            setFileName(file);
        } catch (error) {
            console.log(error.message);
        }

    }

    function handleFile() {
        fileRef.current.click();
    }

    return <form onSubmit={(e) => handleSubmit(e)} className="min-w-[300px] w-[700px] px-5 pb-0 h-full m-auto flex flex-col items-center justify-center gap-3">
        <div>
            <h1>Product Information</h1>
        </div>
        <div className="-3 min-w-80">
            <label>PRODUCT TITLE*</label>
            <input onChange={(e) => handleTitle(e.target.value)} value={title} className={`${errors.title ? 'error' : ''}`} type="title" placeholder="Enter product title" />
        </div>
        <div className="">
            <div className="flex gap-20">
                <div className="flex-1 relative">
                    <label>PRICE* ($)</label>
                    <input value={price} onChange={(e) => handlePrice(e.target.value)} className={`${errors.price ? 'error' : ''}`} type="text" placeholder="Enter price($)" />
                    <span className="absolute text-xl text-gray-700 font-extrabold right-2 bottom-0">$</span>
                </div>
                <div className={`flex-1 relative`}>
                    <label>DISCOUNT (%)</label>
                    <input value={discount} onChange={(e) => handleDiscount(e.target.value)} vatype="number" placeholder="Enter discount" max="100" />
                    <span className="absolute text-xl text-gray-700 font-extrabold right-2 bottom-0">%</span>
                </div>
            </div>
            <div className="text-sm">
                {discount && <p>Your final price will be: {totalPrice}</p>}
            </div>
        </div>
        <div className="flex flex-col">
            <label>
                DESCRIPTION (OPTIONAL)
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" rows={3} />
        </div>
        <div className="relative">
            <label>PRODUCT IMAGE*</label>
            <div
                onClick={handleFile}
                onDrop={(event) => handleDrop(event, false)}
                onDragLeave={(event) => handleDrag(event, false)}
                onDragEnter={(event) => handleDrag(event, true)}
                onDragOver={(event) => handleDrag(event, true)}
                draggable={true}
                className={`w-full h-[80px] relative cursor-pointer rounded border-2 border-[#E5E7EB] flex justify-center flex-col items-center ${errors.file ? 'error' : ''}`}
            >
                {!fileDrag && !fileName && <>
                    <label className="cursor-pointer absolute top-3"><i className="fa-solid fa-upload"></i> Upload an image</label>
                    <p className="text-base absolute bottom-3">PNG, JPG up to 5MB</p>
                </>}
                {fileDrag && !fileName && <label className="absolute top-1/2 -translate-y-1/2">Drop it! I’ll catch it 🤲</label>}
                {fileName && <label>{fileName}</label>}
            </div>
            <input onChange={(e) => onFileChange(e)} ref={fileRef} className="invisible top-5 absolute" type="file" name="myImage" accept="image/png, image/jpeg" placeholder="Upload an image" />
            <p className="text-xs">Recommended image pixels 200 x 200, Aspect Ratio: 1:1</p>
        </div>
        <button className="py-2 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded text-white" variant="primary" type="submit">
            Upload Product
        </button>
    </form>
}

export default ProductUpload;