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
    <div className="bg-card rounded-2xl shadow-card border border-border p-8">
      <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-accent" />
        Club Statistics
      </h3>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-primary/5 rounded-xl">
          <Users className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="font-serif text-3xl font-bold text-foreground">{stats.totalAttendees}</div>
          <div className="text-sm text-muted-foreground">Readers</div>
        </div>

        <div className="text-center p-4 bg-accent/10 rounded-xl">
          <Star className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="font-serif text-3xl font-bold text-foreground">{stats.averageRating.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>

        <div className="text-center p-4 bg-secondary/10 rounded-xl">
          <MessageCircle className="w-6 h-6 text-secondary mx-auto mb-2" />
          <div className="font-serif text-3xl font-bold text-foreground">{stats.totalDiscussions}</div>
          <div className="text-sm text-muted-foreground">Discussions</div>
        </div>

        <div className="text-center p-4 bg-muted rounded-xl">
          <Clock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <div className="font-serif text-2xl font-bold text-foreground">{stats.readingTime}</div>
          <div className="text-sm text-muted-foreground">Avg Read Time</div>
        </div>

        <div className="text-center p-4 bg-primary/5 rounded-xl">
          <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="font-serif text-3xl font-bold text-foreground">{stats.completionRate}%</div>
          <div className="text-sm text-muted-foreground">Finished</div>
        </div>

        {stats.topContributor && (
          <div className="text-center p-4 bg-accent/10 rounded-xl">
            <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold">1</div>
            <div className="font-serif text-lg font-bold text-foreground truncate">{stats.topContributor}</div>
            <div className="text-sm text-muted-foreground">Top Contributor</div>
          </div>
        )}
      </div>

      {/* Attendee Breakdown */}
      {stats.attendeeBreakdown && (
        <div>
          <h4 className="font-serif text-sm small-caps tracking-widest text-muted-foreground mb-4">
            Reader Breakdown
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">First-time readers</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(stats.attendeeBreakdown.firstTimers / stats.totalAttendees) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8">{stats.attendeeBreakdown.firstTimers}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">Regular members</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${(stats.attendeeBreakdown.regulars / stats.totalAttendees) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8">{stats.attendeeBreakdown.regulars}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">Veterans (10+ books)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{ width: `${(stats.attendeeBreakdown.veterans / stats.totalAttendees) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8">{stats.attendeeBreakdown.veterans}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookStats;
