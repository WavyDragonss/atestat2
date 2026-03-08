import { PageHero } from "@/components/PageHero";

const examples = [
  {
    title: "Bubble Sort in C++",
    explanation:
      "Classic in-place sorting algorithm useful for understanding adjacent swaps and nested loops.",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {5, 1, 4, 2, 8};
    for (int i = 0; i < (int)a.size(); i++) {
        for (int j = 0; j + 1 < (int)a.size() - i; j++) {
            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
        }
    }
    for (int x : a) cout << x << " ";
    return 0;
}`,
  },
  {
    title: "Binary Search in C++",
    explanation:
      "Efficient search for sorted arrays. The interval is halved every iteration.",
    code: `#include <bits/stdc++.h>
using namespace std;

int binarySearch(const vector<int>& v, int target) {
    int st = 0, dr = (int)v.size() - 1;
    while (st <= dr) {
        int mid = (st + dr) / 2;
        if (v[mid] == target) return mid;
        if (v[mid] < target) st = mid + 1;
        else dr = mid - 1;
    }
    return -1;
}`,
  },
  {
    title: "Euclidean Algorithm (GCD)",
    explanation:
      "A fundamental BAC topic and one of the fastest ways to compute greatest common divisor.",
    code: `#include <bits/stdc++.h>
using namespace std;

int gcdEuclid(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}`,
  },
  {
    title: "Backtracking Skeleton",
    explanation:
      "General template useful for BAC-style combinatorics and generate-all solutions tasks.",
    code: `#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> sol;

void back(int k) {
    if (k == n) {
        for (int x : sol) cout << x << " ";
        cout << "\\n";
        return;
    }

    for (int value = 1; value <= n; value++) {
        sol.push_back(value);
        back(k + 1);
        sol.pop_back();
    }
}`,
  },
];

export default function CppExamplesPage() {
  return (
    <main className="page-shell">
      <PageHero
        eyebrow="C++"
        title="C++ Algorithm Code Examples"
        description="Study practical C++ implementations with short explanations, then compare each one with its animated visual behavior."
      />

      <section className="card-grid">
        {examples.map((example) => (
          <article className="info-card code-card" key={example.title}>
            <h2>{example.title}</h2>
            <p>{example.explanation}</p>
            <pre>
              <code>{example.code}</code>
            </pre>
          </article>
        ))}
      </section>
    </main>
  );
}
