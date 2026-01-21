function ProductHeaderList({ activeTab, setActiveTab }) {

    return <div className="flex justify-center">
        <ul className="flex min-w-40 gap-2">
            <li className={`${activeTab == 'PRODUCTS' ? 'active' : ''}`} onClick={(e) => setActiveTab('PRODUCTS')}>
                Products
            </li>
            <span className="border-r-2"></span>
            <li className={`${activeTab == 'UPLOAD' ? 'active' : ''}`} onClick={(e) => setActiveTab('UPLOAD')}>
                Upload
            </li>
        </ul>
    </div>
}

export default ProductHeaderList;