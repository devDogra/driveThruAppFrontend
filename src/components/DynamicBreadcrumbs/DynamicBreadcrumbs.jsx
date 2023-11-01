import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import Link from '@mui/material/Link'; 
import Typography from '@mui/material/Typography'
import getPagenameFromRoute from '../../../utils/getPagenameFromRoute';
import { useLocation } from 'react-router-dom';


export default function DynamicBreadcrumbs() {
    const location = useLocation();

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ my: 4 }}>
          <Link underline="hover" color="inherit" href="/">
            BurgerXYZ
          </Link>
          <Typography color="text.primary" fontWeight={"bold"} fontSize={"150%"}>{getPagenameFromRoute(location.pathname)}</Typography>
        </Breadcrumbs>
    );
}