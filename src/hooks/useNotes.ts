
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Note = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function useNotes() {
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Note[];
    }
  });

  const addNoteMutation = useMutation({
    mutationFn: async (note: { title: string; content: string }) => {
      const { data, error } = await supabase
        .from("notes")
        .insert({ title: note.title, content: note.content })
        .select()
        .maybeSingle();
      if (error) throw error;
      return data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

  return {
    notes: notesQuery.data || [],
    notesLoading: notesQuery.isLoading,
    notesError: notesQuery.error,
    addNote: addNoteMutation.mutateAsync,
    isAdding: addNoteMutation.isPending,
  };
}
