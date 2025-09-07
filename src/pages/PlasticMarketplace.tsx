import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Package, Truck, DollarSign, Calendar, MapPin } from 'lucide-react';

interface Company {
  id: string;
  company_name: string;
  plastic_price_per_kg: number;
  address: string;
  phone: string;
}

interface Transaction {
  id: string;
  plastic_type: string;
  quantity_kg: number;
  price_per_kg: number;
  total_amount: number;
  status: string;
  pickup_address: string;
  pickup_date: string;
  created_at: string;
  buyer: {
    company_name: string | null;
  } | null;
}

const PlasticMarketplace = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [plasticType, setPlasticType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  useEffect(() => {
    fetchCompanies();
    fetchTransactions();
  }, [user]);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, company_name, plastic_price_per_kg, address, phone')
        .eq('user_type', 'company')
        .not('plastic_price_per_kg', 'is', null)
        .order('plastic_price_per_kg', { ascending: false });

      if (error) throw error;

      setCompanies(data?.map(company => ({
        id: company.user_id,
        company_name: company.company_name || '',
        plastic_price_per_kg: company.plastic_price_per_kg || 0,
        address: company.address || '',
        phone: company.phone || '',
      })) || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load recycling companies');
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('plastic_transactions')
        .select(`
          *,
          buyer:profiles!plastic_transactions_buyer_id_fkey(company_name)
        `)
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions((data as any) || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load your transactions');
    }
  };

  const handleSellPlastic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCompany) return;

    setLoading(true);
    try {
      const quantityNum = parseFloat(quantity);
      const totalAmount = quantityNum * selectedCompany.plastic_price_per_kg;

      const { error } = await supabase
        .from('plastic_transactions')
        .insert({
          seller_id: user.id,
          buyer_id: selectedCompany.id,
          plastic_type: plasticType,
          quantity_kg: quantityNum,
          price_per_kg: selectedCompany.plastic_price_per_kg,
          total_amount: totalAmount,
          pickup_address: pickupAddress,
          pickup_date: pickupDate,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Plastic sale request submitted successfully!');
      setShowSellDialog(false);
      fetchTransactions();
      
      // Reset form
      setPlasticType('');
      setQuantity('');
      setPickupAddress('');
      setPickupDate('');
      setSelectedCompany(null);
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Failed to submit plastic sale request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'collected': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access the plastic marketplace
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Plastic Marketplace</h1>
          <p className="text-muted-foreground">
            Sell your plastic waste to recycling companies at competitive prices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Companies List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Recycling Companies
                </CardTitle>
                <CardDescription>
                  Browse companies buying plastic waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companies.map((company) => (
                    <Card key={company.id} className="border-2 hover:border-primary transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg">{company.company_name}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ₹{company.plastic_price_per_kg}/kg
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{company.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span>₹{company.plastic_price_per_kg} per kg</span>
                          </div>
                        </div>

                        <Dialog open={showSellDialog && selectedCompany?.id === company.id} onOpenChange={setShowSellDialog}>
                          <DialogTrigger asChild>
                            <Button 
                              className="w-full" 
                              onClick={() => {
                                setSelectedCompany(company);
                                setShowSellDialog(true);
                              }}
                            >
                              Sell Plastic
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Sell Plastic to {company.company_name}</DialogTitle>
                              <DialogDescription>
                                Fill out the details to submit your plastic sale request
                              </DialogDescription>
                            </DialogHeader>
                            
                            <form onSubmit={handleSellPlastic} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="plastic-type">Plastic Type</Label>
                                <Select value={plasticType} onValueChange={setPlasticType} required>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select plastic type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="PET">PET Bottles</SelectItem>
                                    <SelectItem value="HDPE">HDPE (Milk jugs, detergent bottles)</SelectItem>
                                    <SelectItem value="PVC">PVC (Pipes, credit cards)</SelectItem>
                                    <SelectItem value="LDPE">LDPE (Plastic bags, food wraps)</SelectItem>
                                    <SelectItem value="PP">PP (Yogurt containers, bottle caps)</SelectItem>
                                    <SelectItem value="PS">PS (Disposable cups, foam packaging)</SelectItem>
                                    <SelectItem value="Mixed">Mixed Plastic</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity (kg)</Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  step="0.1"
                                  min="0.1"
                                  placeholder="Enter quantity in kg"
                                  value={quantity}
                                  onChange={(e) => setQuantity(e.target.value)}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="pickup-address">Pickup Address</Label>
                                <Textarea
                                  id="pickup-address"
                                  placeholder="Enter pickup address"
                                  value={pickupAddress}
                                  onChange={(e) => setPickupAddress(e.target.value)}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="pickup-date">Preferred Pickup Date</Label>
                                <Input
                                  id="pickup-date"
                                  type="date"
                                  value={pickupDate}
                                  onChange={(e) => setPickupDate(e.target.value)}
                                  min={new Date().toISOString().split('T')[0]}
                                  required
                                />
                              </div>

                              {quantity && (
                                <div className="p-4 bg-muted rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span>Total Amount:</span>
                                    <span className="font-bold text-lg">
                                      ₹{(parseFloat(quantity) * company.plastic_price_per_kg).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button type="button" variant="outline" onClick={() => setShowSellDialog(false)} className="flex-1">
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-1">
                                  {loading ? 'Submitting...' : 'Submit Request'}
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {companies.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No recycling companies available at the moment
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* My Transactions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  My Transactions
                </CardTitle>
                <CardDescription>
                  Track your plastic sale requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                          <span className="text-sm font-semibold">₹{transaction.total_amount}</span>
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div><span className="font-medium">Type:</span> {transaction.plastic_type}</div>
                          <div><span className="font-medium">Quantity:</span> {transaction.quantity_kg} kg</div>
                          <div><span className="font-medium">Company:</span> {transaction.buyer?.company_name || 'N/A'}</div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(transaction.pickup_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {transactions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlasticMarketplace;