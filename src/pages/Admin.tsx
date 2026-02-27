import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, MessageSquare, LogOut, Download, Search } from "lucide-react";
import { format } from "date-fns";

const Admin = () => {
  const { signOut } = useAuth();
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      const [n, c, m] = await Promise.all([
        supabase.from("newsletter_signups").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("membership_signups").select("*").order("created_at", { ascending: false }),
      ]);
      setNewsletter(n.data ?? []);
      setContacts(c.data ?? []);
      setMembers(m.data ?? []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const q = search.toLowerCase();

  const filteredNewsletter = useMemo(
    () => newsletter.filter((r) => r.email?.toLowerCase().includes(q)),
    [newsletter, q]
  );

  const filteredContacts = useMemo(
    () => contacts.filter((r) =>
      r.name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.message?.toLowerCase().includes(q)
    ),
    [contacts, q]
  );

  const filteredMembers = useMemo(
    () => members.filter((r) =>
      r.first_name?.toLowerCase().includes(q) ||
      r.last_name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.membership_type?.toLowerCase().includes(q) ||
      r.favorite_genres?.toLowerCase().includes(q)
    ),
    [members, q]
  );

  const formatDate = (d: string) => format(new Date(d), "MMM d, yyyy");

  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map(row => headers.map(h => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Signups</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsletter.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Membership Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <Tabs defaultValue="newsletter">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search across all fields..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <TabsContent value="newsletter">
              <Card>
                <div className="flex justify-end p-4 pb-0">
                  <Button variant="outline" size="sm" onClick={() => exportCSV(filteredNewsletter, "newsletter-signups")}>
                    <Download className="h-4 w-4 mr-2" /> Export CSV
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNewsletter.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{formatDate(r.created_at)}</TableCell>
                      </TableRow>
                    ))}
                    {filteredNewsletter.length === 0 && (
                      <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground">{search ? "No results found" : "No signups yet"}</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="contacts">
              <Card>
                <div className="flex justify-end p-4 pb-0">
                  <Button variant="outline" size="sm" onClick={() => exportCSV(filteredContacts, "contact-submissions")}>
                    <Download className="h-4 w-4 mr-2" /> Export CSV
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.name}</TableCell>
                        <TableCell>{r.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{r.message}</TableCell>
                        <TableCell>{formatDate(r.created_at)}</TableCell>
                      </TableRow>
                    ))}
                    {filteredContacts.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">{search ? "No results found" : "No submissions yet"}</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <Card>
                <div className="flex justify-end p-4 pb-0">
                  <Button variant="outline" size="sm" onClick={() => exportCSV(filteredMembers, "membership-signups")}>
                    <Download className="h-4 w-4 mr-2" /> Export CSV
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Genres</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.first_name} {r.last_name}</TableCell>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{r.membership_type}</TableCell>
                        <TableCell className="max-w-xs truncate">{r.favorite_genres}</TableCell>
                        <TableCell>{r.how_did_you_hear}</TableCell>
                        <TableCell>{formatDate(r.created_at)}</TableCell>
                      </TableRow>
                    ))}
                    {filteredMembers.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">{search ? "No results found" : "No signups yet"}</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
