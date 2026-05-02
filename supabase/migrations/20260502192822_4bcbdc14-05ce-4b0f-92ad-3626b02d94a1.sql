-- Permitir UPDATE/INSERT públicos em equipes, partidas e pagamentos
-- AVISO: temporário enquanto admin é protegido só por senha hardcoded no client.
-- Substituir por policies baseadas em role 'admin' assim que Supabase Auth for habilitado.

CREATE POLICY "admin_update_equipes_temp" ON public.equipes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "admin_delete_equipes_temp" ON public.equipes FOR DELETE USING (true);

CREATE POLICY "admin_insert_partidas_temp" ON public.partidas FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_update_partidas_temp" ON public.partidas FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "admin_delete_partidas_temp" ON public.partidas FOR DELETE USING (true);

CREATE POLICY "admin_update_pagamentos_temp" ON public.pagamentos FOR UPDATE USING (true) WITH CHECK (true);