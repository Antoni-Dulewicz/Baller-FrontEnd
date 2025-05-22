const ChooseUserType = ({types, setUserType}) => {
    return (
    <>
        <div className="formTypeChoose">
            {types.map((type, index, array) => {
                return (
                    <div className="typeOption" key={index} onClick={(event) => {
                            setUserType(type);
                        }}>
                        {type}
                    </div>
                )
            })}
        </div>
    </>
    );
}

export default ChooseUserType;