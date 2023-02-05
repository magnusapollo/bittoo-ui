import { Grid, Typography } from "@mui/material";

const CartItemCard = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography variant="body1"><div>itemId</div></Typography>
                <Typography variant="body1"><div>{props.item.itemId}</div></Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1"><div>QUANTITY</div></Typography>
                <Typography variant="body1"><div display='inline'>{props.item.quantity}</div></Typography>
            </Grid>
        </Grid>
    )
}
export default CartItemCard;