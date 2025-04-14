import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import ProductsList from "@/components/admin/ProductsList";
import ProductForm from "@/components/admin/ProductForm";
import { LogOut, Plus } from "lucide-react";

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
    
    // Check if Supabase is configured
    if (!supabase) {
      toast({
        variant: "destructive",
        title: "Supabase not configured",
        description: "Please check your environment variables",
      });
    }
  }, [user, navigate, toast]);

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setShowAddForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  if (!user) {
    return null; // Don't render anything if not logged in (will redirect)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showAddForm ? (
          <ProductForm 
            product={editingProduct} 
            onClose={handleFormClose} 
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              <Button onClick={handleAddNewClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="space-y-4">
                <ProductsList onEditProduct={handleEditProduct} />
              </TabsContent>
              
              <TabsContent value="categories">
                <Card>
                  <CardHeader>
                    <CardTitle>Categories Management</CardTitle>
                    <CardDescription>
                      Manage your product categories here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Category management functionality will be added here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
