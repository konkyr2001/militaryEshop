function ProductHeaderList({ activeTab, setActiveTab }) {

    return <div className="flex justify-center pt-4 mb-3">
        <ul className="flex min-w-40 gap-2">
            <li>
                <button className={`${activeTab == 'PRODUCTS' ? 'active' : ''}`} onClick={(e) => setActiveTab('PRODUCTS')}>
                    My Products
                </button>
            </li>
            <span className="border-r-2"></span>
            <li>
                <button className={`${activeTab == 'UPLOAD' ? 'active' : ''}`} onClick={(e) => setActiveTab('UPLOAD')}>
                    Upload a new product
                </button>
            </li>
        </ul>
    </div>
}

export default ProductHeaderList;