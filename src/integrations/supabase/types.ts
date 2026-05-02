export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      campeonato_config: {
        Row: {
          criado_em: string | null
          data_fim: string | null
          data_inicio: string | null
          edicao: number | null
          id: string
          inscricoes_abertas: boolean | null
          max_equipes: number | null
          min_equipes: number | null
          nome: string | null
          plataforma: string | null
          premiacao_1: number | null
          premiacao_2: number | null
          valor_inscricao_lote1: number | null
          valor_inscricao_lote2: number | null
        }
        Insert: {
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          edicao?: number | null
          id?: string
          inscricoes_abertas?: boolean | null
          max_equipes?: number | null
          min_equipes?: number | null
          nome?: string | null
          plataforma?: string | null
          premiacao_1?: number | null
          premiacao_2?: number | null
          valor_inscricao_lote1?: number | null
          valor_inscricao_lote2?: number | null
        }
        Update: {
          criado_em?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          edicao?: number | null
          id?: string
          inscricoes_abertas?: boolean | null
          max_equipes?: number | null
          min_equipes?: number | null
          nome?: string | null
          plataforma?: string | null
          premiacao_1?: number | null
          premiacao_2?: number | null
          valor_inscricao_lote1?: number | null
          valor_inscricao_lote2?: number | null
        }
        Relationships: []
      }
      equipes: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          gc_id: string | null
          grupo: number | null
          id: string
          lote: number | null
          nome: string
          status: Database["public"]["Enums"]["team_status"] | null
          valor_inscricao: number | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          gc_id?: string | null
          grupo?: number | null
          id?: string
          lote?: number | null
          nome: string
          status?: Database["public"]["Enums"]["team_status"] | null
          valor_inscricao?: number | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          gc_id?: string | null
          grupo?: number | null
          id?: string
          lote?: number | null
          nome?: string
          status?: Database["public"]["Enums"]["team_status"] | null
          valor_inscricao?: number | null
        }
        Relationships: []
      }
      jogadores: {
        Row: {
          criado_em: string | null
          email: string | null
          equipe_id: string
          gc_nick: string | null
          id: string
          is_capitao: boolean | null
          nickname: string
          nome: string
          role: Database["public"]["Enums"]["player_role"]
          telefone: string | null
        }
        Insert: {
          criado_em?: string | null
          email?: string | null
          equipe_id: string
          gc_nick?: string | null
          id?: string
          is_capitao?: boolean | null
          nickname: string
          nome: string
          role: Database["public"]["Enums"]["player_role"]
          telefone?: string | null
        }
        Update: {
          criado_em?: string | null
          email?: string | null
          equipe_id?: string
          gc_nick?: string | null
          id?: string
          is_capitao?: boolean | null
          nickname?: string
          nome?: string
          role?: Database["public"]["Enums"]["player_role"]
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jogadores_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          equipe_id: string
          id: string
          infinitepay_checkout_url: string | null
          infinitepay_transaction_id: string | null
          metodo: Database["public"]["Enums"]["payment_method"] | null
          pago_em: string | null
          pix_copia_cola: string | null
          pix_qr_code: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          valor: number
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          equipe_id: string
          id?: string
          infinitepay_checkout_url?: string | null
          infinitepay_transaction_id?: string | null
          metodo?: Database["public"]["Enums"]["payment_method"] | null
          pago_em?: string | null
          pix_copia_cola?: string | null
          pix_qr_code?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          valor: number
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          equipe_id?: string
          id?: string
          infinitepay_checkout_url?: string | null
          infinitepay_transaction_id?: string | null
          metodo?: Database["public"]["Enums"]["payment_method"] | null
          pago_em?: string | null
          pix_copia_cola?: string | null
          pix_qr_code?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
      partidas: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          data_hora: string | null
          data_hora_fim: string | null
          equipe_a_id: string | null
          equipe_b_id: string | null
          fase: Database["public"]["Enums"]["match_phase"]
          formato: Database["public"]["Enums"]["match_format"] | null
          grupo: number | null
          id: string
          mapa: string | null
          observacoes: string | null
          placar_a: number | null
          placar_b: number | null
          tem_stream: boolean | null
          vencedor_id: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_hora?: string | null
          data_hora_fim?: string | null
          equipe_a_id?: string | null
          equipe_b_id?: string | null
          fase: Database["public"]["Enums"]["match_phase"]
          formato?: Database["public"]["Enums"]["match_format"] | null
          grupo?: number | null
          id?: string
          mapa?: string | null
          observacoes?: string | null
          placar_a?: number | null
          placar_b?: number | null
          tem_stream?: boolean | null
          vencedor_id?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_hora?: string | null
          data_hora_fim?: string | null
          equipe_a_id?: string | null
          equipe_b_id?: string | null
          fase?: Database["public"]["Enums"]["match_phase"]
          formato?: Database["public"]["Enums"]["match_format"] | null
          grupo?: number | null
          id?: string
          mapa?: string | null
          observacoes?: string | null
          placar_a?: number | null
          placar_b?: number | null
          tem_stream?: boolean | null
          vencedor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partidas_equipe_a_id_fkey"
            columns: ["equipe_a_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partidas_equipe_b_id_fkey"
            columns: ["equipe_b_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partidas_vencedor_id_fkey"
            columns: ["vencedor_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      match_format: "MD1" | "MD3" | "MD5"
      match_phase:
        | "grupo"
        | "quartas"
        | "semifinal"
        | "final"
        | "terceiro_lugar"
      payment_method: "pix" | "cartao_credito" | "cartao_debito" | "link"
      payment_status: "pendente" | "aprovado" | "recusado" | "estornado"
      player_role: "entry_fragger" | "awper" | "rifler" | "support" | "compleat"
      team_status: "pendente" | "confirmada" | "cancelada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      match_format: ["MD1", "MD3", "MD5"],
      match_phase: ["grupo", "quartas", "semifinal", "final", "terceiro_lugar"],
      payment_method: ["pix", "cartao_credito", "cartao_debito", "link"],
      payment_status: ["pendente", "aprovado", "recusado", "estornado"],
      player_role: ["entry_fragger", "awper", "rifler", "support", "compleat"],
      team_status: ["pendente", "confirmada", "cancelada"],
    },
  },
} as const
