export interface WorriesServiceClass {
  http: any;
  getWorries: () => any;
  addWorry: (email: any, password: any) => any;
  getRecentWorries: () => any;
  filterRecentWorries: () => any;
  getPastWorries: () => any;
  filterPastWorries: () => any;
  filterValuablePastWorries: () => any;
  filterInvaluablePastWorries: () => any;
  lockWorry: (id: any) => any;
  unlockWorry: (id: any) => any;
  deleteWorry: (id: any) => any;
  getWorryReviewChat: (id: any) => any;
}

export default class WorriesService implements WorriesServiceClass {
  http: any;

  constructor(http: any) {
    this.http = http;
  }

  async getWorries() {
    return this.http.fetch('/worries/home', {
      method: 'GET',
    });
  }

  async addWorry(email: any, password: any) {
    return this.http.fetch('/worries/write', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async getRecentWorries() {
    return this.http.fetch('/worries/recent', {
      method: 'GET',
    });
  }

  async filterRecentWorries() {
    return this.http.fetch('/worries/recent/filter', {
      method: 'GET',
    });
  }

  async getPastWorries() {
    return this.http.fetch('/worries/past', {
      method: 'GET',
    });
  }

  async filterPastWorries() {
    return this.http.fetch('/worries/past/filter', {
      method: 'GET',
    });
  }

  async filterValuablePastWorries() {
    return this.http.fetch('/worries/past/mean', {
      method: 'GET',
    });
  }

  async filterInvaluablePastWorries() {
    return this.http.fetch('/worries/past/meanless', {
      method: 'GET',
    });
  }

  async lockWorry(id: any) {
    return this.http.fetch(`/worries/${id}`, {
      method: 'PATCH',
    });
  }

  async unlockWorry(id: any) {
    return this.http.fetch(`/worries/${id}`, {
      method: 'PATCH',
    });
  }

  async deleteWorry(id: any) {
    return this.http.fetch(`/worries/${id}`, {
      method: 'DELETE',
    });
  }

  async getWorryReviewChat(id: any) {
    return this.http.fetch(`/worries/chat/${id}`, {
      method: 'GET',
    });
  }

  async addWorryReview(email: any, password: any) {
    return this.http.fetch('/worries/chat/realize', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async updateWorryExpiredDate(id: any) {
    return this.http.fetch('/worries/review/date', {
      method: 'PUT',
    });
  }

  async getWorryReview(id: any) {
    return this.http.fetch(`/worries/review/${id}`, {
      method: 'GET',
    });
  }

  async updatePresentWorry() {
    return this.http.fetch('/worries/review/realize', {
      method: 'PATCH',
    });
  }

  async updateWorryReview() {
    return this.http.fetch('/worries/review', {
      method: 'PATCH',
    });
  }
}
