import { useState } from 'react';
import { MessageCircle, Phone, Video, MoreVertical, Search, Users, Circle } from 'lucide-react';

const FriendList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Mock friend data with real-time status
  // const friends = [
  //   {
  //     id: 1,
  //     name: 'Alex Rivera',
  //     status: 'online',
  //     lastMessage: 'Hey! Did you see the game last night?',
  //     timestamp: '2m ago',
  //     unread: 3,
  //     avatar: 'AR',
  //     typing: false
  //   },
    
  // ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-emerald-400';
      case 'away': return 'bg-amber-400';
      case 'offline': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="flex-none px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Users className="w-7 h-7 text-cyan-400" strokeWidth={2.5} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Chats
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800/70 transition-all"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4">
        <div className="space-y-1 pb-4">
          {filteredFriends.map((friend, index) => (
            <div
              key={friend.id}
              onClick={() => setSelectedFriend(friend.id)}
              className={`
                group relative px-3 sm:px-4 py-3 rounded-xl cursor-pointer
                transition-all duration-200 ease-out
                ${selectedFriend === friend.id 
                  ? 'bg-cyan-500/20 border border-cyan-500/30' 
                  : 'hover:bg-slate-800/40 border border-transparent'
                }
              `}
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="relative flex shrink-0">
                  <div className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
                    bg-linear-to-br from-cyan-500 to-blue-600
                    flex items-center justify-center text-white font-bold
                    text-sm sm:text-base
                    shadow-lg shadow-cyan-500/20
                    ${friend.status === 'online' ? 'ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-slate-900' : ''}
                  `}>
                    {friend.avatar}
                  </div>
                  <div className={`
                    absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-900
                    ${getStatusColor(friend.status)}
                  `} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white truncate text-sm sm:text-base">
                      {friend.name}
                    </h3>
                    <span className="text-xs text-slate-500 flex shrink-0 ml-2">
                      {friend.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`
                      text-xs sm:text-sm truncate
                      ${friend.typing ? 'text-cyan-400 italic' : 'text-slate-400'}
                    `}>
                      {friend.typing ? 'typing...' : friend.lastMessage}
                    </p>
                    {friend.unread > 0 && (
                      <div className="flex shrink-0 ml-2 px-2 py-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full">
                        {friend.unread}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions - Desktop Only */}
                <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Phone className="w-4 h-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                    <Video className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status Bar - Mobile */}
      <div className="sm:hidden flex-none border-t border-slate-800/50 px-4 py-3 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
            <span>{friends.filter(f => f.status === 'online').length} online</span>
          </div>
          <span>{friends.length} total contacts</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FriendList;