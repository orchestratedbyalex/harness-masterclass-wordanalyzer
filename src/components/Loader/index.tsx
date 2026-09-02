import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      minHeight: 'min(320px, 60vh)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

export default function AppLoader() {
  const classes = useStyles();

  return (
    <div className={classes.root} role="status" aria-label="Loading WordAnalyzer">
      <CircularProgress color="primary" size={40} thickness={4} />
    </div>
  );
}
