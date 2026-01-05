import { NetlifyDebugTest } from '@/components/NetlifyDebugTest';

/**
 * Trang test Supabase connection
 * Sử dụng để kiểm tra kết nối và setup database
 */
const SupabaseTest = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Supabase Integration Test</h1>
          <p className="text-muted-foreground">
            Kiểm tra kết nối và setup database cho Memory Safe Guard
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Production-ready debug test component */}
          <NetlifyDebugTest />
        </div>
      </div>
    </div>
  );
};

export default SupabaseTest;