import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const CreditsCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 300,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src="https://github.com/ooiuri.png?size=200"
            alt="Iuri Reis"
            sx={{ width: 72, height: 72, border: '2px solid #e0e0e0' }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ lineHeight: 1.2 }}
            >
              Iuri Reis
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Frontend Software Developer
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Link
                href="https://github.com/ooiuri"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <GitHubIcon sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2">/ooiuri</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreditsCard;
