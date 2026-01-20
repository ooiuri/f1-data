import { Box } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import Race from '../../models/Race';
import { useGetRacesQueries } from '../../queries/races.query';
import { useContext } from 'react';
import SeasonContext from '../../contexts/SeasonContext';
import InfoCard from '../../components/InfoCard/InfoCard';

const columns: GridColDef<Race>[] = [
  {
    field: 'round',
    headerName: 'Round',
    type: 'number',
    width: 120,
  },
  {
    field: 'dateFormatted',
    headerName: 'Date',
    width: 120,
  },
  {
    field: 'raceName',
    headerName: 'Circuit',
    width: 350,
  },
];

const RacesPage = () => {
  const { currentSeason } = useContext(SeasonContext);

  const [races] = useGetRacesQueries(
    currentSeason,
    !!currentSeason
  );
  return (
    <Box sx={{ minWidth: 275}}>
      {!currentSeason ? (
        <InfoCard title="Please, select a season" />
      ) : (
        <>
          <InfoCard title={"Races of " + currentSeason} />
          <DataGrid
            loading={races.isLoading || races.isPending}
            rows={races.data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            getRowId={(row) => row.round}
          />
        </>
      )}
    </Box>
  );
};

export default RacesPage;
