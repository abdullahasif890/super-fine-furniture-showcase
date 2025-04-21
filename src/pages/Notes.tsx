
import { useAuth } from "@/contexts/AuthContext";
import { useNotes } from "@/hooks/useNotes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Modified schema to ensure title is required
const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
});

type NoteForm = z.infer<typeof noteSchema>;

const Notes = () => {
  const { user, loading } = useAuth();
  const { notes, notesLoading, addNote, isAdding, notesError } = useNotes();
  const { toast } = useToast();

  const form = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: NoteForm) => {
    try {
      // Ensure we're passing the required title
      await addNote({
        title: values.title,
        content: values.content || "" // Provide a default empty string
      });
      toast({ title: "Note added", description: "Your note has been saved." });
      form.reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to add note",
        description: String(err),
      });
    }
  };

  if (!user && !loading) {
    // Only show notes page for logged in users
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Please log in to view your notes.</CardTitle>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-24 pb-10">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Notes</h1>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add a Note</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  placeholder="Title"
                  {...form.register("title")}
                  disabled={isAdding}
                />
                <Textarea
                  placeholder="Write your note..."
                  {...form.register("content")}
                  disabled={isAdding}
                  className="min-h-[100px]"
                />
                <Button type="submit" disabled={isAdding} className="w-full">
                  {isAdding ? "Saving..." : "Add Note"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <section>
            <h2 className="text-xl font-semibold mb-3">Your Notes</h2>
            {notesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="h-20 w-full rounded" />
                ))}
              </div>
            ) : notesError ? (
              <div className="text-red-600">Error loading notes.</div>
            ) : notes.length === 0 ? (
              <div className="text-gray-500">No notes found. Start by adding your first note!</div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap text-gray-700 text-sm">
                        {note.content}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(note.created_at).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
