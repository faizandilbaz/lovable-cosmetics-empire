
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 3200 },
  { month: "Feb", sales: 4500 },
  { month: "Mar", sales: 5600 },
  { month: "Apr", sales: 6700 },
  { month: "May", sales: 5400 },
  { month: "Jun", sales: 7200 },
];

const categoryData = [
  { name: "Skincare", value: 35 },
  { name: "Makeup", value: 25 },
  { name: "Haircare", value: 20 },
  { name: "Fragrance", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const StatCard = ({ title, value, icon, trend, trendLabel }: { 
  title: string, 
  value: string, 
  icon: React.ReactNode,
  trend?: "up" | "down",
  trendLabel?: string
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && trendLabel && (
        <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
          <TrendingUp size={16} className={`mr-1 ${trend === "down" ? "transform rotate-180" : ""}`} />
          {trendLabel}
        </p>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, Admin</h1>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value="$32,621.90" 
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          trendLabel="12% from last month"
        />
        <StatCard 
          title="Active Users" 
          value="1,245" 
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          trendLabel="8% from last month"
        />
        <StatCard 
          title="Total Orders" 
          value="342" 
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          trendLabel="5% from last month"
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend="down"
          trendLabel="2% from last month"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className="mr-4 h-2 w-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {i === 1 && "New order #1234 has been placed"}
                    {i === 2 && "User Jane Smith updated their profile"}
                    {i === 3 && "Inventory low alert for 'Luxury Face Cream'"}
                    {i === 4 && "New product review for 'Hydrating Serum'"}
                    {i === 5 && "Payment received for order #1230"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {i === 1 && "2 minutes ago"}
                    {i === 2 && "15 minutes ago"}
                    {i === 3 && "1 hour ago"}
                    {i === 4 && "3 hours ago"}
                    {i === 5 && "5 hours ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
