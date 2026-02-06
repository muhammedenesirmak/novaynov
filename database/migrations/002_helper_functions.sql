-- Helper Functions for NovaYnov
-- Bu fonksiyonlar backend'den çağrılacak

-- ============================================================================
-- XP Ekleme Fonksiyonu
-- ============================================================================
CREATE OR REPLACE FUNCTION add_xp(user_id UUID, xp_amount INTEGER)
RETURNS VOID AS $$
DECLARE
  current_xp INTEGER;
  new_xp INTEGER;
  new_level INTEGER;
BEGIN
  -- Mevcut XP'yi al
  SELECT total_xp INTO current_xp
  FROM users
  WHERE id = user_id;

  -- Yeni XP hesapla
  new_xp := current_xp + xp_amount;

  -- Yeni seviye hesapla
  new_level := FLOOR(SQRT(new_xp / 50)) + 1;

  -- Kullanıcıyı güncelle
  UPDATE users
  SET 
    total_xp = new_xp,
    level = new_level,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Referral Count Artırma Fonksiyonu
-- ============================================================================
CREATE OR REPLACE FUNCTION increment_referral_count(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE users
  SET 
    referral_count = referral_count + 1,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Subject İstatistikleri Fonksiyonu (Premium için)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_subject_stats(user_id UUID)
RETURNS TABLE(
  subject_id UUID,
  subject_name VARCHAR,
  total_questions INTEGER,
  correct_answers INTEGER,
  accuracy DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    COUNT(up.id)::INTEGER as total_questions,
    COUNT(CASE WHEN up.is_correct THEN 1 END)::INTEGER as correct_answers,
    CASE 
      WHEN COUNT(up.id) > 0 THEN 
        ROUND((COUNT(CASE WHEN up.is_correct THEN 1 END)::DECIMAL / COUNT(up.id)::DECIMAL) * 100, 2)
      ELSE 0
    END as accuracy
  FROM subjects s
  LEFT JOIN topics t ON t.subject_id = s.id
  LEFT JOIN questions q ON q.topic_id = t.id
  LEFT JOIN user_progress up ON up.question_id = q.id AND up.user_id = get_subject_stats.user_id
  GROUP BY s.id, s.name
  ORDER BY s.order_index;
END;
$$ LANGUAGE plpgsql;
