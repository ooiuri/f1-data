import { Card, CardContent, Avatar, Typography, Box, Link, Divider, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';

const CreditsCard = () => {
  const GITHUB_USER_URL = "https://github.com/ooiuri";
  const REPO_URL = "https://github.com/ooiuri/f1-data";

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        minWidth: 320, 
        borderRadius: 3, 
        bgcolor: 'background.paper',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar 
            src="https://github.com/ooiuri.png" 
            alt="Iuri Reis"
            sx={{ width: 72, height: 72, border: '2px solid' }}
          />
          <Box>
            <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
              Iuri Reis
            </Typography>
            <Typography variant="caption" fontWeight="500">Frontend Software Developer</Typography>
            <Link 
              href={GITHUB_USER_URL}
              target="_blank"
              underline="hover"
              color="text.secondary"
              sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
            >
              <GitHubIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" fontWeight="500">@ooiuri</Typography>
            </Link>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', mb: 1, display: 'block' }}>
            Project Repository
          </Typography>
          <Button
            href={REPO_URL}
            target="_blank"
            variant="contained"
            fullWidth
            startIcon={<CodeIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              bgcolor: '#24292e',
              '&:hover': {
                bgcolor: '#000'
              }
            }}
          >
            f1-data
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreditsCard;