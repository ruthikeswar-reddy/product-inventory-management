//styled is used to define style for a component easily.
const {styled} = require('@mui/system')
const {  Box } = require("@mui/material");



const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

});

export default FlexBetween;