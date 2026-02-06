-- NovaYnov Database Schema
-- TYT-AYT Gamification Platform
-- Created: 2026-01-30

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Table 1: users
-- Kullanıcı bilgileri ve gamification verileri
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  
  -- Gamification
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  
  -- Premium
  is_premium BOOLEAN DEFAULT false,
  premium_until TIMESTAMP,
  premium_source VARCHAR(50), -- 'payment', 'referral'
  
  -- Referral
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  referred_by UUID REFERENCES users(id),
  referral_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 2: subjects
-- Dersler (Matematik, Fizik, Tarih, Coğrafya)
-- ============================================================================
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon_url TEXT,
  color VARCHAR(20),
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 3: topics
-- Konular (Her dersin alt konuları)
-- ============================================================================
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER,
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('kolay', 'orta', 'zor')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(subject_id, slug)
);

-- ============================================================================
-- Table 4: flashcards
-- Hızlı bilgi kartları
-- ============================================================================
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  
  -- Kart İçeriği
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  front_image_url TEXT,
  back_image_url TEXT,
  
  -- Metadata
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 5: questions
-- Sorular
-- ============================================================================
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  
  -- Soru İçeriği
  question_text TEXT NOT NULL,
  question_image_url TEXT,
  
  -- Şıklar (JSON formatında)
  options JSONB NOT NULL,
  correct_answer VARCHAR(1) NOT NULL,
  
  -- Açıklama
  explanation TEXT,
  explanation_image_url TEXT,
  
  -- Metadata
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('kolay', 'orta', 'zor')),
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 6: user_progress
-- Kullanıcı ilerlemesi - Soru geçmişi
-- ============================================================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  
  -- Cevap Bilgileri
  user_answer VARCHAR(1),
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  
  -- Spaced Repetition için
  times_seen INTEGER DEFAULT 1,
  times_correct INTEGER DEFAULT 0,
  times_wrong INTEGER DEFAULT 0,
  last_seen_at TIMESTAMP DEFAULT NOW(),
  next_review_at TIMESTAMP,
  
  -- Streak tracking
  answered_at TIMESTAMP DEFAULT NOW(),
  session_id UUID,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 7: daily_stats
-- Günlük istatistikler - Limit takibi
-- ============================================================================
CREATE TABLE daily_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Günlük Aktivite
  questions_answered INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  
  -- Limit kontrolü için
  tests_completed INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, date)
);

-- ============================================================================
-- Table 8: sessions
-- Çalışma oturumları
-- ============================================================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id),
  
  -- Oturum Bilgileri
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  
  -- Performans
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  
  -- Session state
  is_completed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 9: subscriptions
-- Abonelikler
-- ============================================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- İyzico bilgileri
  payment_id VARCHAR(255),
  subscription_reference_code VARCHAR(255),
  
  -- Abonelik Detayları
  plan_type VARCHAR(50) DEFAULT 'monthly',
  amount DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'TRY',
  
  -- Tarihler
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  
  -- Durum
  status VARCHAR(50) DEFAULT 'active',
  auto_renew BOOLEAN DEFAULT true,
  
  -- Tracking
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Table 10: referrals
-- Davet takibi
-- ============================================================================
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  
  -- Ödül Durumu
  reward_granted BOOLEAN DEFAULT false,
  reward_granted_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(referrer_id, referred_id)
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================

-- User Progress indexes
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_question ON user_progress(question_id);
CREATE INDEX idx_user_progress_next_review ON user_progress(next_review_at);
CREATE INDEX idx_user_progress_session ON user_progress(session_id);

-- Daily Stats index
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, date);

-- Sessions indexes
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_topic ON sessions(topic_id);

-- Questions indexes
CREATE INDEX idx_questions_topic ON questions(topic_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty_level);

-- Topics index
CREATE INDEX idx_topics_subject ON topics(subject_id);

-- Subscriptions index
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Referrals index
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred ON referrals(referred_id);

-- ============================================================================
-- FUNCTIONS for Auto-updating
-- ============================================================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for subscriptions table
CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- User progress policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Daily stats policies
CREATE POLICY "Users can view own stats"
  ON daily_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON daily_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON daily_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Sessions policies
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view referrals where they are referrer"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id);

-- Public read access for subjects, topics, flashcards, questions
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active subjects"
  ON subjects FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active topics"
  ON topics FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active flashcards"
  ON flashcards FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active questions"
  ON questions FOR SELECT
  USING (is_active = true);

-- ============================================================================
-- COMPLETE!
-- ============================================================================
