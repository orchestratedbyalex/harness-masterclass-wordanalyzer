import { createStyles, makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: '100%',
            maxWidth: 180,
            height: 112,
            borderRadius: 14,
            color: theme.palette.primary.dark,
            backgroundColor: '#eef5ff',
            fontWeight: 700,
        },
    }),
);

export { useStyles };
