﻿using static Azure.Core.HttpHeader;

namespace Jiu_Jitsu_Journal.Models
{
    public class Class
    {
        public int Id { get; set; }
        public string Notes { get; set; }
        public string TypeOfClass { get; set; }
        public DateTime Date { get; set; }
        public int Duration { get; set; }
        public UserProfile UserProfile { get; set; }
        public int UserProfileId { get; set; }

    }
}