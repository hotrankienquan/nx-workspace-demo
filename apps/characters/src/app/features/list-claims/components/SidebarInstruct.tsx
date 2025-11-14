import { Box, Link, Typography, useTheme } from "@mui/material";
import { CategoryType } from "../types/types";

const SidebarInstruct =
  ({ setActiveCategory }: { setActiveCategory: (c: CategoryType) => void }) => {

    const theme = useTheme();

    return (
      <Box
        sx={{
          width: 180,
          p: 2,
          height: '100%',
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          marginTop: theme.spacing(2),
        }}

      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Categories</Typography>
        {['Motor', 'Casualty', 'Property'].map((cat) => (
          <Link key={cat} onClick={() => setActiveCategory(cat as CategoryType)}
            sx={{ cursor: 'pointer', display: 'block', py: 0.5 }}>
            {cat}
          </Link>
        ))}
      </Box>
    )
  }

export default SidebarInstruct;