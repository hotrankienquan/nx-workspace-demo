import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const secondarySidebarWidth = 180;

const SidebarInstruct = () => {
  return (
    <Box
        sx={{
          width: secondarySidebarWidth,
          flexShrink: 0,
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#fff',
          zIndex: 1100, // Below App Bar
          pt: '64px', // Offset for App Bar
          alignSelf:"flex-start",
          marginTop:"50px"
        }}
      >
        <Box sx={{ p: 2, height: '100%' }}>
          <List>
            {['Motor', 'Casualty', 'Property'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    backgroundColor: index === 0 ? '#e8f5e9' : 'transparent', // Highlight 'Motor'
                    borderRadius: 1,
                    borderLeft: index === 0 ? '4px solid green' : 'none',
                    fontWeight: index === 0 ? 'bold' : 'normal',
                    color: index === 0 ? 'green' : 'inherit',
                    pl: 1
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

  )
}

export default SidebarInstruct