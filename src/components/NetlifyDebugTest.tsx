import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

/**
 * Component debug để test Supabase trên Netlify
 * Kiểm tra environment variables và kết nối database
 */
export const NetlifyDebugTest = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDebugTest = async () => {
    setLoading(true);
    const results: any = {
      timestamp: new Date().toISOString(),
      environment: {},
      supabaseTest: {},
      databaseTest: {}
    };

    try {
      // 1. Kiểm tra environment variables
      results.environment = {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'NOT_SET',
        hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
        anonKeyLength: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0,
        mode: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        prod: import.meta.env.PROD
      };

      // 2. Test Supabase connection
      console.log('🔍 Testing Supabase connection...');
      const startTime = Date.now();
      
      const { data: connectionTest, error: connectionError } = await supabase
        .from('passwords')
        .select('count', { count: 'exact', head: true });

      const latency = Date.now() - startTime;

      results.supabaseTest = {
        connected: !connectionError,
        latency: `${latency}ms`,
        error: connectionError?.message || null,
        count: connectionTest || 0
      };

      // 3. Test database operations
      if (!connectionError) {
        console.log('📝 Testing database operations...');
        
        // Test INSERT
        const testEntry = {
          service: `Netlify Test ${Date.now()}`,
          username: 'test@netlify.com',
          password: 'test123'
        };

        const { data: insertData, error: insertError } = await supabase
          .from('passwords')
          .insert([testEntry])
          .select()
          .single();

        results.databaseTest.insert = {
          success: !insertError,
          error: insertError?.message || null,
          data: insertData?.id || null
        };

        // Test SELECT
        const { data: selectData, error: selectError } = await supabase
          .from('passwords')
          .select('*')
          .limit(5);

        results.databaseTest.select = {
          success: !selectError,
          error: selectError?.message || null,
          count: selectData?.length || 0
        };

        // Cleanup - DELETE test entry
        if (insertData?.id) {
          const { error: deleteError } = await supabase
            .from('passwords')
            .delete()
            .eq('id', insertData.id);

          results.databaseTest.cleanup = {
            success: !deleteError,
            error: deleteError?.message || null
          };
        }
      }

    } catch (error) {
      results.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Debug test error:', error);
    }

    setDebugInfo(results);
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>🔍 Netlify Debug Test</CardTitle>
        <CardDescription>
          Kiểm tra cấu hình Supabase và kết nối database trên Netlify
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Button 
          onClick={runDebugTest} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Đang test...' : 'Chạy Debug Test'}
        </Button>
        
        {debugInfo && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">🌍 Environment Variables</h3>
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(debugInfo.environment, null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">🔗 Supabase Connection</h3>
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(debugInfo.supabaseTest, null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">🗄️ Database Operations</h3>
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(debugInfo.databaseTest, null, 2)}
              </pre>
            </div>

            {debugInfo.error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Error</h3>
                <p className="text-red-600 dark:text-red-400 text-sm">{debugInfo.error}</p>
              </div>
            )}
          </div>
        )}

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Hướng dẫn khắc phục</h3>
          <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1">
            <li>1. Kiểm tra Environment Variables trong Netlify Dashboard</li>
            <li>2. Đảm bảo VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY được set</li>
            <li>3. Chạy SQL script setup_rls_policies.sql trong Supabase</li>
            <li>4. Redeploy site sau khi thay đổi env vars</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};