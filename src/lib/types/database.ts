/**
 * Database Types cho Supabase
 * Định nghĩa structure của các bảng trong database
 * Updated: Sử dụng tên cột chuẩn (service, username, password)
 */
export interface Database {
  public: {
    Tables: {
      passwords: {
        Row: {
          id: string
          service: string
          username: string
          password: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service: string
          username: string
          password: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service?: string
          username?: string
          password?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

/**
 * Mapping types giữa Supabase và Local Database
 * Updated: Sử dụng tên cột chuẩn, không cần mapping
 */
export type SupabasePasswordEntry = Database['public']['Tables']['passwords']['Row']
export type SupabasePasswordInsert = Database['public']['Tables']['passwords']['Insert']
export type SupabasePasswordUpdate = Database['public']['Tables']['passwords']['Update']

/**
 * Utility functions để convert giữa local và remote format
 * Updated: Không cần mapping vì đã sử dụng tên cột chuẩn
 */
export const PasswordEntryMapper = {
  /**
   * Convert từ Supabase format sang Local format
   * Note: Không cần convert vì đã dùng tên cột chuẩn
   */
  toLocal: (supabaseEntry: SupabasePasswordEntry): import('../supabase-service-fixed').PasswordEntry => ({
    id: supabaseEntry.id,
    service: supabaseEntry.service,
    username: supabaseEntry.username,
    password: supabaseEntry.password,
    createdAt: supabaseEntry.created_at,
    updatedAt: supabaseEntry.updated_at
  }),

  /**
   * Convert từ Local format sang Supabase format
   * Note: Không cần convert vì đã dùng tên cột chuẩn
   */
  toSupabase: (localEntry: import('../supabase-service-fixed').PasswordEntry): SupabasePasswordInsert => ({
    id: localEntry.id,
    service: localEntry.service,
    username: localEntry.username,
    password: localEntry.password,
    created_at: localEntry.createdAt,
    updated_at: localEntry.updatedAt
  })
}

/**
 * Type guards để kiểm tra data format
 */
export const isSupabasePasswordEntry = (entry: any): entry is SupabasePasswordEntry => {
  return entry && 
    typeof entry.id === 'string' &&
    typeof entry.service === 'string' &&
    typeof entry.username === 'string' &&
    typeof entry.password === 'string'
}

export const isLocalPasswordEntry = (entry: any): entry is import('../supabase-service-fixed').PasswordEntry => {
  return entry && 
    typeof entry.id === 'string' &&
    typeof entry.service === 'string' &&
    typeof entry.username === 'string' &&
    typeof entry.password === 'string'
}