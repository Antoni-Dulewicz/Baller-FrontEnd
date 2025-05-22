const ChooseUserType = ({types}) => {
    return (
    <>
        <div className="formTypeChoose">
            {types.map((type, index, array) => {
                return (
                    <div className="typeOption" key={index}>
                        {type}
                    </div>
                )
            })}
        </div>
    </>
    );
}

export default ChooseUserType;