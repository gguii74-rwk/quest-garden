export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          locale: string;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          locale?: string;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          locale?: string;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      children: {
        Row: {
          id: string;
          parent_id: string;
          name: string;
          grade: string | null;
          avatar_type: Database["public"]["Enums"]["avatar_type"];
          avatar_variant: string;
          avatar_name: string;
          avatar_level: number;
          theme_id: string;
          total_points: number;
          total_stars: number;
          total_xp: number;
          level: number;
          current_daily_streak: number;
          longest_daily_streak: number;
          current_weekly_streak: number;
          current_monthly_streak: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          name: string;
          grade?: string | null;
          avatar_type?: Database["public"]["Enums"]["avatar_type"];
          avatar_variant?: string;
          avatar_name?: string;
          avatar_level?: number;
          theme_id?: string;
          total_points?: number;
          total_stars?: number;
          total_xp?: number;
          level?: number;
          current_daily_streak?: number;
          longest_daily_streak?: number;
          current_weekly_streak?: number;
          current_monthly_streak?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          parent_id?: string;
          name?: string;
          grade?: string | null;
          avatar_type?: Database["public"]["Enums"]["avatar_type"];
          avatar_variant?: string;
          avatar_name?: string;
          avatar_level?: number;
          theme_id?: string;
          total_points?: number;
          total_stars?: number;
          total_xp?: number;
          level?: number;
          current_daily_streak?: number;
          longest_daily_streak?: number;
          current_weekly_streak?: number;
          current_monthly_streak?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      missions: {
        Row: {
          id: string;
          child_id: string;
          title: string;
          icon: string;
          emoji: string | null;
          category: string;
          points: number;
          stars: number;
          xp: number;
          description: string | null;
          requires_parent_approval: boolean;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          title: string;
          icon: string;
          emoji?: string | null;
          category?: string;
          points?: number;
          stars?: number;
          xp?: number;
          description?: string | null;
          requires_parent_approval?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          title?: string;
          icon?: string;
          emoji?: string | null;
          category?: string;
          points?: number;
          stars?: number;
          xp?: number;
          description?: string | null;
          requires_parent_approval?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      mission_schedules: {
        Row: {
          id: string;
          mission_id: string;
          repeat_type: Database["public"]["Enums"]["repeat_type"];
          weekdays: number[];
          start_date: string;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          mission_id: string;
          repeat_type?: Database["public"]["Enums"]["repeat_type"];
          weekdays?: number[];
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          mission_id?: string;
          repeat_type?: Database["public"]["Enums"]["repeat_type"];
          weekdays?: number[];
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      mission_instances: {
        Row: {
          id: string;
          mission_id: string;
          child_id: string;
          scheduled_date: string;
          title_snapshot: string;
          icon_snapshot: string;
          category_snapshot: string;
          points_snapshot: number;
          stars_snapshot: number;
          xp_snapshot: number;
          requires_parent_approval_snapshot: boolean;
          status: Database["public"]["Enums"]["mission_status"];
          submitted_at: string | null;
          approved_by: string | null;
          approved_at: string | null;
          rejected_at: string | null;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mission_id: string;
          child_id: string;
          scheduled_date: string;
          title_snapshot: string;
          icon_snapshot: string;
          category_snapshot: string;
          points_snapshot: number;
          stars_snapshot: number;
          xp_snapshot: number;
          requires_parent_approval_snapshot: boolean;
          status?: Database["public"]["Enums"]["mission_status"];
          submitted_at?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          rejected_at?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mission_id?: string;
          child_id?: string;
          scheduled_date?: string;
          title_snapshot?: string;
          icon_snapshot?: string;
          category_snapshot?: string;
          points_snapshot?: number;
          stars_snapshot?: number;
          xp_snapshot?: number;
          requires_parent_approval_snapshot?: boolean;
          status?: Database["public"]["Enums"]["mission_status"];
          submitted_at?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          rejected_at?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      rewards: {
        Row: {
          id: string;
          child_id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          required_points: number;
          required_stars: number;
          repeatable: boolean;
          active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          required_points?: number;
          required_stars?: number;
          repeatable?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          required_points?: number;
          required_stars?: number;
          repeatable?: boolean;
          active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reward_redemptions: {
        Row: {
          id: string;
          reward_id: string;
          child_id: string;
          status: Database["public"]["Enums"]["reward_redemption_status"];
          requested_at: string | null;
          approved_at: string | null;
          redeemed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          reward_id: string;
          child_id: string;
          status?: Database["public"]["Enums"]["reward_redemption_status"];
          requested_at?: string | null;
          approved_at?: string | null;
          redeemed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          reward_id?: string;
          child_id?: string;
          status?: Database["public"]["Enums"]["reward_redemption_status"];
          requested_at?: string | null;
          approved_at?: string | null;
          redeemed_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reading_entries: {
        Row: {
          id: string;
          child_id: string;
          title: string | null;
          cover_color: string;
          cover_image_url: string | null;
          book_count: number;
          read_date: string;
          source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          title?: string | null;
          cover_color?: string;
          cover_image_url?: string | null;
          book_count?: number;
          read_date?: string;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string;
          title?: string | null;
          cover_color?: string;
          cover_image_url?: string | null;
          book_count?: number;
          read_date?: string;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      approve_mission_instances: {
        Args: { p_instance_ids: string[] };
        Returns: string[];
      };
    };
    Enums: {
      avatar_type: "animal" | "robot" | "wizard" | "princess" | "explorer";
      mission_status: "pending" | "submitted" | "approved" | "rejected" | "skipped";
      repeat_type: "once" | "daily" | "weekdays" | "weekends" | "custom_weekdays";
      reward_redemption_status:
        | "unlocked"
        | "requested"
        | "approved"
        | "redeemed"
        | "cancelled";
      transaction_type:
        | "mission"
        | "reading"
        | "achievement"
        | "reward_adjustment"
        | "manual_adjustment";
    };
    CompositeTypes: Record<string, never>;
  };
};
