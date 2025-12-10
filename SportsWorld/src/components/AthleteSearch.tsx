const AthleteSearch = () => {
    return (
        <section>
            <h2 className="text-1xl font-bold m-1">Search by Name</h2>
            <div className="m-2">
                <input type="text" className="border"/>
                <button className="border cursor-pointer ml-1 px-2 rounded">
                    Search
                </button>
            </div>
        </section>
    )
}

export default AthleteSearch;