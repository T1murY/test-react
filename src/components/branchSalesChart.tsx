import { Typography, Box, useTheme, styled } from '@mui/material';
import { PieChart, useDrawingArea } from '@mui/x-charts';

const SalesChart = () => {
  const theme = useTheme();
  const data = [
    { name: 'Current Week', value: 2500, color: theme.palette.primary.main },
    { name: 'Last Week', value: 1000, color: theme.palette.secondary.main },
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }:any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill={theme.palette.text.primary} textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box sx={{backgroundColor:"white",borderRadius:4, margin:1.5,padding:2}}>
      <Typography variant="h6" gutterBottom>
        Sales
      </Typography>
        <PieChart 
        width={400}
        height={300}
        series={[
            {
                data: data,
                innerRadius:100,
                outerRadius: 120
            }
        ]}
        >
             <PieCenterLabel>
             total
              3.500
            </PieCenterLabel>
        </PieChart>
      <Box display="flex" justifyContent="center" mt={2} flexDirection={'column'}>
        {data.map((entry, index) => (
          <Box key={`legend-${index}`} display="flex" alignItems="center" m={2}>
            <Box
              bgcolor={COLORS[index % COLORS.length]}
              width={16}
              height={16}
              borderRadius={2}
              mr={1}
            />
            <Typography variant="body2" color="textSecondary">
              {entry.name} {entry.value} {index === 0 ? '↑ 8.8%' : '↓ 5.8%'}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  const StyledText = styled('text')(({ theme }:any) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

export default SalesChart;