import {Box, Typography} from "@mui/material";

const ChooseUserType = ({types, selectedType, setSelectedType}) => {
    return (
    <Box
        display="flex"
        width="100%"
        overflow="hidden"
    >
        {types.map((type, index) => (
            <Box
                key={index}
                onClick={() => setSelectedType(type)}
                sx={{
                    flex: 1,
                    textAlign: 'center',
                    p: 2,
                    cursor: 'pointer',
                    userSelect: 'none',
                    bgcolor: selectedType === type ? '#1565c0' : '#2074d4',
                    color: selectedType === type ? '#fff' : '#eee',
                    transition: 'background-color 0.6s',
                    '&:hover': {
                        bgcolor: selectedType === type ? '#1565c0' : '#1265c0',
                        color: selectedType === type ? '#eee' : '#ddd' 
                    }
                }}
            >
                <Typography key={index} fontWeight={700}>
                    {type}
                </Typography>
            </Box>
        ))}
    </Box>
    )
}

export default ChooseUserType;