import { Users, Star, MessageCircle, Clock, BookOpen, Trophy } from "lucide-react";

export interface BookStatsData {
  totalAttendees: number;
  averageRating: number;
  totalDiscussions: number;
  readingTime: string;
  completionRate: number;
  topContributor?: string;
  attendeeBreakdown?: {
    firstTimers: number;
    regulars: number;
    veterans: number;
  };
}

interface BookStatsProps {
  stats: BookStatsData;
  bookTitle: string;
}

const BookStats = ({ stats, bookTitle }: BookStatsProps) => {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <p className="small-caps text-xs tracking-[0.25em] text-accent mb-2">Club Statistics</p>
        <h3 className="font-serif text-2xl text-foreground">Reader Engagement</h3>
      </div>

      {/* Main Stats - Minimal Grid */}
      <div className="grid grid-cols-3 gap-4 md:gap-8">
        <div className="text-center py-6 px-4 bg-card rounded-xl border border-border/50">
          <Users className="w-5 h-5 text-accent mx-auto mb-3 opacity-70" />
          <div className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{stats.totalAttendees}</div>
          <div className="text-xs text-muted-foreground small-caps tracking-wider">Readers</div>
        </div>

        <div className="text-center py-6 px-4 bg-card rounded-xl border border-border/50">
          <Star className="w-5 h-5 text-accent mx-auto mb-3 opacity-70" />
          <div className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{stats.averageRating.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground small-caps tracking-wider">Rating</div>
        </div>

        <div className="text-center py-6 px-4 bg-card rounded-xl border border-border/50">
          <MessageCircle className="w-5 h-5 text-accent mx-auto mb-3 opacity-70" />
          <div className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-1">{stats.totalDiscussions}</div>
          <div className="text-xs text-muted-foreground small-caps tracking-wider">Discussions</div>
        </div>
      </div>

      {/* Secondary Stats - Inline */}
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 py-6 border-y border-border/30">
        <div className="flex items-center gap-2.5 text-sm">
          <Clock className="w-4 h-4 text-accent/60" />
          <span className="text-muted-foreground">Avg. read time:</span>
          <span className="font-medium text-foreground">{stats.readingTime}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <BookOpen className="w-4 h-4 text-accent/60" />
          <span className="text-muted-foreground">Completion:</span>
          <span className="font-medium text-foreground">{stats.completionRate}%</span>
        </div>
        {stats.topContributor && (
          <div className="flex items-center gap-2.5 text-sm">
            <Trophy className="w-4 h-4 text-accent/60" />
            <span className="text-muted-foreground">Top contributor:</span>
            <span className="font-medium text-foreground">{stats.topContributor}</span>
          </div>
        )}
      </div>

      {/* Attendee Breakdown - Refined */}
      {stats.attendeeBreakdown && (
        <div className="bg-card/50 rounded-xl p-6 border border-border/30">
          <h4 className="font-serif text-sm text-center small-caps tracking-widest text-muted-foreground mb-6">
            Reader Breakdown
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-body text-sm text-muted-foreground min-w-[120px]">First-timers</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/70 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(stats.attendeeBreakdown.firstTimers / stats.totalAttendees) * 100}%` }}
                />
              </div>
              <span className="text-sm font-serif text-foreground w-8 text-right">{stats.attendeeBreakdown.firstTimers}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-body text-sm text-muted-foreground min-w-[120px]">Regulars</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent/70 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(stats.attendeeBreakdown.regulars / stats.totalAttendees) * 100}%` }}
                />
              </div>
              <span className="text-sm font-serif text-foreground w-8 text-right">{stats.attendeeBreakdown.regulars}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-body text-sm text-muted-foreground min-w-[120px]">Veterans</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary/70 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(stats.attendeeBreakdown.veterans / stats.totalAttendees) * 100}%` }}
                />
              </div>
              <span className="text-sm font-serif text-foreground w-8 text-right">{stats.attendeeBreakdown.veterans}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStats;
