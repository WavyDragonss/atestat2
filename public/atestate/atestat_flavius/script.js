/* ============================================================
   BacInfo — script principal
   Autor: Curelariu Flavius
   Continut bazat pe materialele profesorului Acatrinei-Vasiliu
   Cristinel-Petrica si pe codul prezentat la clasa.
   ============================================================ */

/* ============================================================
   SECTIUNEA 1 — ELEMENTE DE BAZA C++
   ============================================================ */
const BAZA_HTML = `

<div class="block">
  <h3>1.1. Vocabularul limbajului</h3>
  <p><strong>Setul de caractere</strong> este alcătuit din:</p>
  <ul>
    <li>litere mici și mari ale alfabetului englez (a..z, A..Z)</li>
    <li>cifrele (0..9)</li>
    <li>caractere speciale: <code>+ - * = ( ) { } [ ] . : ! @ $ ^ &amp;</code></li>
  </ul>
  <div class="nota"><strong>Observație:</strong> limbajul C++ face distincție între literele mari și mici.</div>

  <p style="margin-top:1rem;"><strong>Identificatorii</strong> — numele asociat unei variabile, constante sau funcții. Primul caracter trebuie să fie literă sau liniuță de subliniere.</p>

  <p><strong>Cuvintele cheie</strong> — identificatori cu semnificație fixă: <code>for</code>, <code>while</code>, <code>if</code>, <code>else</code>, <code>return</code> etc.</p>

  <p><strong>Comentariile</strong> — secvențe ignorate de compilator:</p>
<pre class="code"><span class="cm">/* comentariu pe mai multe linii */</span>
<span class="cm">// comentariu pe o singura linie</span></pre>
</div>


<div class="block">
  <h3>1.2. Tipuri de date</h3>
  <p>Definesc mulțimea valorilor pe care le pot lua datele și operațiile care se pot efectua asupra lor.</p>

  <h4 style="margin-top:1rem;">Tipuri întregi</h4>
  <table class="tbl">
    <tr><th>Tip</th><th>Valori minime / maxime</th><th>Memorie</th></tr>
    <tr><td><code>char</code></td><td>-128 .. 127</td><td>1 octet</td></tr>
    <tr><td><code>short</code></td><td>-32 768 .. 32 767</td><td>2 octeți</td></tr>
    <tr><td><code>int</code></td><td>-2 147 483 648 .. 2 147 483 647</td><td>4 octeți</td></tr>
    <tr><td><code>long</code></td><td>-2⁶² - 1 .. 2⁶²</td><td>8 octeți</td></tr>
  </table>

  <h4 style="margin-top:1rem;">Tipuri reale</h4>
  <table class="tbl">
    <tr><th>Tip</th><th>Memorie</th></tr>
    <tr><td><code>float</code></td><td>4 octeți</td></tr>
    <tr><td><code>double</code></td><td>8 octeți</td></tr>
    <tr><td><code>long double</code></td><td>12 octeți</td></tr>
  </table>
</div>


<div class="block">
  <h3>1.3. Operatori</h3>

  <h4>Operatori aritmetici</h4>
  <table class="tbl">
    <tr><th>Operator</th><th>Semnificație</th></tr>
    <tr><td><code>+</code></td><td>Adunare</td></tr>
    <tr><td><code>-</code></td><td>Scădere</td></tr>
    <tr><td><code>*</code></td><td>Înmulțire</td></tr>
    <tr><td><code>/</code></td><td>Împărțire</td></tr>
    <tr><td><code>%</code></td><td>Restul împărțirii</td></tr>
  </table>

  <h4 style="margin-top:1rem;">Operatori relaționali</h4>
  <table class="tbl">
    <tr><th>Operator</th><th>Semnificație</th></tr>
    <tr><td><code>&lt;</code></td><td>Mai mic ca</td></tr>
    <tr><td><code>&gt;</code></td><td>Mai mare ca</td></tr>
    <tr><td><code>&lt;=</code></td><td>Mai mic sau egal</td></tr>
    <tr><td><code>&gt;=</code></td><td>Mai mare sau egal</td></tr>
    <tr><td><code>==</code></td><td>Egal</td></tr>
    <tr><td><code>!=</code></td><td>Diferit de</td></tr>
  </table>

  <h4 style="margin-top:1rem;">Operatori logici</h4>
  <table class="tbl">
    <tr><th>Operator</th><th>Semnificație</th></tr>
    <tr><td><code>!</code></td><td>Negație logică</td></tr>
    <tr><td><code>&amp;&amp;</code></td><td>ȘI logic</td></tr>
    <tr><td><code>||</code></td><td>SAU logic</td></tr>
  </table>
</div>


<div class="block">
  <h3>1.4. Variabile și constante</h3>
  <p><strong>Variabilele</strong> își pot schimba conținutul pe parcursul execuției. Trebuie declarate înainte de a fi folosite:</p>
<pre class="code"><span class="kw">float</span> a;
<span class="kw">float</span> a, b, c;</pre>

  <p><strong>Constantele</strong> au valori fixe și se pot defini astfel:</p>
<pre class="code"><span class="cm">#define pi 3.14</span>
<span class="kw">const</span> <span class="kw">float</span> pi = <span class="num">3.14</span>;</pre>
</div>


<div class="block">
  <h3>1.5. Structura unui program C++</h3>
  <p>Orice program C++ are cel puțin funcția <code>main()</code>. Pentru a folosi funcții predefinite (ex: <code>cout</code>, <code>cin</code>) se include o directivă preprocesor.</p>
<pre class="code"><span class="cm">#include &lt;iostream&gt;</span>
<span class="kw">using namespace</span> std;

<span class="cm">// declaratii globale</span>

<span class="kw">int</span> main()
{
    <span class="cm">// instructiuni</span>
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>
`;


/* ============================================================
   SECTIUNEA 2 — TABLOURI SI MATRICI
   ============================================================ */
const TABLOURI_HTML = `

<div class="block">
  <h3>2.1. Ce este un tablou</h3>
  <p>Tabloul este o listă finită de elemente de același tip, plasate succesiv într-o zonă continuă de memorie. Tablourile pot fi:</p>
  <ul>
    <li><strong>simple</strong> (vector — o singură dimensiune)</li>
    <li><strong>multiple</strong> (matrice — două dimensiuni: linii și coloane)</li>
  </ul>
</div>


<div class="block">
  <h3>2.2. Declararea unui vector</h3>
<pre class="code"><span class="kw">int</span> v[<span class="num">7</span>];   <span class="cm">// vector cu 7 componente intregi: v[0]..v[6]</span>

<span class="kw">float</span> a[<span class="num">10</span>], b[<span class="num">20</span>];   <span class="cm">// doi vectori reali</span>

<span class="kw">int</span> a[<span class="num">10</span>][<span class="num">20</span>];  <span class="cm">// matrice cu 10 linii si 20 coloane</span>

<span class="cm">// initializare statica:</span>
<span class="kw">int</span> a[<span class="num">5</span>] = {-<span class="num">2</span>, <span class="num">4</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">9</span>};
<span class="kw">int</span> b[<span class="num">3</span>][<span class="num">4</span>] = { {<span class="num">11</span>,<span class="num">12</span>,<span class="num">13</span>,<span class="num">14</span>},
                {<span class="num">21</span>,<span class="num">22</span>,<span class="num">23</span>,<span class="num">24</span>},
                {<span class="num">31</span>,<span class="num">32</span>,<span class="num">33</span>,<span class="num">34</span>} };</pre>
  <div class="nota"><strong>Atenție:</strong> indexarea începe de la 0. Vectorul <code>v[7]</code> are indici de la 0 la 6.</div>
</div>


<div class="block">
  <h3>2.3. Accesarea elementelor</h3>
  <p>Valoarea elementului din vector de pe poziția <code>i</code> se află în <code>v[i]</code>.</p>
<pre class="code">cout &lt;&lt; v[<span class="num">2</span>];   <span class="cm">// afiseaza al treilea element (pozitiile 0 si 1 sunt primele doua)</span></pre>
</div>


<div class="block">
  <h3>2.4. Citirea elementelor unui vector</h3>
<pre class="code"><span class="cm">#include &lt;iostream&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> main()
{
    <span class="kw">int</span> v[<span class="num">100</span>], n, i;
    cout &lt;&lt; <span class="str">"Cate elemente introduceti="</span>;
    cin &gt;&gt; n;
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++) {
        cout &lt;&lt; <span class="str">"\\nIntroduceti elementul "</span> &lt;&lt; i &lt;&lt; <span class="str">" ="</span>;
        cin &gt;&gt; v[i];
    }
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>


<div class="block">
  <h3>2.5. Afișarea elementelor</h3>
<pre class="code"><span class="cm">// vector definit la declarare</span>
<span class="kw">int</span> v[] = {<span class="num">3</span>, <span class="num">6</span>, <span class="num">4</span>, <span class="num">7</span>, <span class="num">9</span>};
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; <span class="kw">sizeof</span>(v)/<span class="num">4</span>; i++)
    cout &lt;&lt; <span class="str">"\\nElementul "</span> &lt;&lt; i &lt;&lt; <span class="str">" ="</span> &lt;&lt; v[i];</pre>
  <div class="nota">Pentru a afla numărul de elemente al unui vector <code>int</code>, folosim <code>sizeof(v)/4</code> (fiecare element ocupă 4 octeți).</div>
</div>


<div class="block">
  <h3>2.6. Matrici — citire și afișare</h3>
  <p>În cazul matricilor folosim <strong>două bucle for imbricate</strong>: una pentru linii, una pentru coloane.</p>
<pre class="code"><span class="kw">int</span> v[<span class="num">100</span>][<span class="num">100</span>], n, m, i, j;
cout &lt;&lt; <span class="str">"Cate linii="</span>; cin &gt;&gt; n;
cout &lt;&lt; <span class="str">"Cate coloane="</span>; cin &gt;&gt; m;

<span class="cm">// citire</span>
<span class="kw">for</span> (i = <span class="num">1</span>; i &lt;= n; i++)
    <span class="kw">for</span> (j = <span class="num">1</span>; j &lt;= m; j++) {
        cout &lt;&lt; <span class="str">"v["</span> &lt;&lt; i &lt;&lt; <span class="str">"]["</span> &lt;&lt; j &lt;&lt; <span class="str">"]="</span>;
        cin &gt;&gt; v[i][j];
    }

<span class="cm">// afisare</span>
<span class="kw">for</span> (i = <span class="num">1</span>; i &lt;= n; i++) {
    cout &lt;&lt; endl;
    <span class="kw">for</span> (j = <span class="num">1</span>; j &lt;= m; j++)
        cout &lt;&lt; v[i][j] &lt;&lt; <span class="str">" "</span>;
}</pre>
</div>
`;


/* ============================================================
   SECTIUNEA 3 — POINTERI
   ============================================================ */
const POINTERI_HTML = `

<div class="block">
  <h3>3.1. Ce este un pointer</h3>
  <p>O variabilă este stocată într-o anumită zonă de memorie, caracterizată de adresa acestei zone. Accesul la variabilă se poate face <strong>prin numele ei</strong> sau <strong>prin adresa</strong> la care este stocată.</p>
  <p><strong>Pointerul</strong> este o variabilă în care se memorează o adresă de memorie. Declararea unui pointer:</p>
<pre class="code"><span class="kw">int</span> *p1, *p2;       <span class="cm">// doi pointeri catre tipul int</span>
<span class="kw">float</span> *adr1, *adr2;  <span class="cm">// pointeri catre tipul float</span></pre>
</div>


<div class="block">
  <h3>3.2. Operatori specifici</h3>
  <p><strong>Operatorul <code>&amp;</code></strong> — operator de adresare (<em>referențiere</em>). Aplicat unei variabile, întoarce adresa la care este stocată.</p>
  <p><strong>Operatorul <code>*</code></strong> — operator de redirectare (<em>dereferențiere</em>). Aplicat unui pointer, întoarce valoarea variabilei aflate la adresa memorată în pointer.</p>
<pre class="code"><span class="kw">int</span> x = <span class="num">1</span>;
<span class="kw">int</span> *px = &amp;x;

<span class="cm">// px      -> variabila pointer</span>
<span class="cm">// px      -> contine adresa lui x</span>
<span class="cm">// *px     -> contine valoarea aflata la adresa memorata in pointer (= 1)</span></pre>
</div>


<div class="block">
  <h3>3.3. Operatori de atribuire și aritmetici</h3>
  <p>Unei variabile pointer i se poate atribui doar o adresă de memorie:</p>
  <ul>
    <li>o adresă obținută cu operatorul <code>&amp;</code></li>
    <li>o altă variabilă pointer de același tip</li>
    <li>constanta <code>NULL</code></li>
  </ul>
  <p>Operatori aritmetici aplicabili pointerilor:</p>
  <ul>
    <li>Adunare / scădere a unei constante (<code>+</code>, <code>-</code>)</li>
    <li>Incrementare / decrementare (<code>++</code>, <code>--</code>)</li>
    <li>Scăderea a doi pointeri (<code>-</code>)</li>
  </ul>
</div>


<div class="block">
  <h3>3.4. Referința</h3>
  <p>Variabila <code>b</code> este o referință către variabila <code>a</code> — practic, un alt nume pentru aceeași zonă de memorie.</p>
<pre class="code"><span class="kw">int</span> a = <span class="num">1</span>;
<span class="kw">int</span> &amp;b = a;
cout &lt;&lt; a;   <span class="cm">// 1</span>
cout &lt;&lt; b;   <span class="cm">// 1</span></pre>
  <div class="nota"><strong>Important:</strong> chiar dacă s-au declarat două variabile, există o singură zonă de memorie. Modificarea uneia o modifică pe cealaltă.</div>
</div>


<div class="block">
  <h3>3.5. Exemplu complet</h3>
<pre class="code"><span class="cm">#include &lt;iostream&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> main()
{
    <span class="kw">int</span> *p, a = <span class="num">3</span>, b = <span class="num">9</span>;
    p = &amp;a;
    cout &lt;&lt; p &lt;&lt; endl;     <span class="cm">// adresa lui a</span>
    cout &lt;&lt; *p &lt;&lt; endl;    <span class="cm">// 3</span>

    <span class="kw">int</span> &amp;ra = a;
    cout &lt;&lt; ra &lt;&lt; endl;    <span class="cm">// 3</span>
    ra++;                  <span class="cm">// incrementeaza si pe a</span>
    cout &lt;&lt; a &lt;&lt; endl;     <span class="cm">// 4</span>

    ra = b;                <span class="cm">// modifica valoarea lui a (nu referinta)</span>
    cout &lt;&lt; ra &lt;&lt; <span class="str">" "</span> &lt;&lt; a; <span class="cm">// 9 9</span>
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>


<div class="block">
  <h3>3.6. Pointeri și tablouri</h3>
  <p>Numele unui tablou reprezintă <strong>adresa de început</strong> a acestuia în memorie. Pointerii pot fi folosiți pentru a parcurge tablouri:</p>
<pre class="code"><span class="kw">char</span> v[] = <span class="str">"abcd"</span>;

cout &lt;&lt; *v;            <span class="cm">// afiseaza 'a' (primul element)</span>

<span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt;= <span class="num">4</span>; i++)
    cout &lt;&lt; *(v + i);  <span class="cm">// afiseaza abcd</span></pre>
</div>
`;


/* ============================================================
   SECTIUNEA 4 — RECURSIVITATE
   ============================================================ */
const RECURSIV_HTML = `

<div class="block">
  <h3>4.1. Definiție</h3>
  <p>O funcție se numește <strong>recursivă</strong> dacă ea se autoapelează.</p>
  <p>Exemplu clasic: calculul factorialului. Se observă că <code>n! = (n-1)! · n</code> și că <code>0! = 1</code>:</p>
<pre class="code"><span class="num">5</span>! = <span class="num">4</span>! * <span class="num">5</span>
<span class="num">4</span>! = <span class="num">3</span>! * <span class="num">4</span>
<span class="num">3</span>! = <span class="num">2</span>! * <span class="num">3</span>
<span class="num">2</span>! = <span class="num">1</span>! * <span class="num">2</span>
<span class="num">1</span>! = <span class="num">0</span>! * <span class="num">1</span>
<span class="num">0</span>! = <span class="num">1</span>  (prin conventie matematica)</pre>
</div>


<div class="block">
  <h3>4.2. Varianta iterativă vs varianta recursivă</h3>
<pre class="code"><span class="cm">// VARIANTA ITERATIVA</span>
<span class="kw">int</span> factorial(<span class="kw">int</span> n) {
    <span class="kw">int</span> s = <span class="num">1</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt;= n; i++)
        s = s * i;
    <span class="kw">return</span> s;
}

<span class="cm">// VARIANTA RECURSIVA</span>
<span class="kw">long</span> factorial(<span class="kw">int</span> n) {
    <span class="kw">if</span> (n == <span class="num">0</span>)
        <span class="kw">return</span> <span class="num">1</span>;            <span class="cm">// caz de baza</span>
    <span class="kw">else</span>
        <span class="kw">return</span> factorial(n-<span class="num">1</span>) * n;   <span class="cm">// caz general (autoapel)</span>
}</pre>
</div>


<div class="block">
  <h3>4.3. Reguli pentru construirea unui program recursiv</h3>
  <ol>
    <li>Corpul programului trebuie să conțină:
      <ul>
        <li><strong>cazul general</strong> al soluției (aici se execută autoapelul)</li>
        <li><strong>cazul de bază</strong> al soluției (caz special, fără autoapel)</li>
      </ul>
    </li>
    <li>Este <strong>obligatorie condiția de oprire</strong> a repetiției</li>
  </ol>
  <div class="nota">
    <strong>Observații:</strong> Mecanismul recursivității înlocuiește instrucțiunile repetitive. Procesul are 2 etape: descompunerea problemei (de sus în jos) și rezolvarea ei (de jos în sus). La fiecare autoapel, în <em>stivă</em> se creează o nouă instanță a variabilelor locale.
  </div>
</div>


<div class="block">
  <h3>4.4. Problema 1 — Suma primelor n numere</h3>
<pre class="code"><span class="kw">int</span> suma(<span class="kw">int</span> n) {
    <span class="kw">if</span> (n == <span class="num">0</span>) <span class="kw">return</span> <span class="num">0</span>;
    <span class="kw">else</span>
        <span class="kw">return</span> n + suma(n-<span class="num">1</span>);
}

<span class="kw">int</span> main() {
    <span class="kw">int</span> n;
    cin &gt;&gt; n;
    cout &lt;&lt; <span class="str">"Suma primelor "</span> &lt;&lt; n &lt;&lt; <span class="str">" numere este "</span> &lt;&lt; suma(n);
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>


<div class="block">
  <h3>4.5. Problema 2 — Cel mai mare divizor comun</h3>
<pre class="code"><span class="kw">int</span> cmmdc(<span class="kw">int</span> a, <span class="kw">int</span> b) {
    <span class="kw">if</span> ((a != <span class="num">0</span>) <span class="kw">and</span> (b != <span class="num">0</span>))
        <span class="kw">return</span> cmmdc(b, a%b);
    <span class="kw">else</span> {
        <span class="kw">if</span> (b == <span class="num">0</span>) <span class="kw">return</span> a;
        <span class="kw">if</span> (a == <span class="num">0</span>) <span class="kw">return</span> b;
    }
}</pre>
</div>


<div class="block">
  <h3>4.6. Problema 3 — Citire și afișare recursivă a unui vector</h3>
<pre class="code"><span class="kw">int</span> a[<span class="num">50</span>], i, j;

<span class="kw">void</span> citire(<span class="kw">int</span> n1) {
    <span class="kw">if</span> (n1 != <span class="num">0</span>) {
        cout &lt;&lt; <span class="str">"\\na["</span> &lt;&lt; i &lt;&lt; <span class="str">"]="</span>;
        cin &gt;&gt; a[i++];
        citire(n1 - <span class="num">1</span>);
    }
}

<span class="kw">void</span> afisare(<span class="kw">int</span> n2) {
    <span class="kw">if</span> (n2 != <span class="num">0</span>) {
        cout &lt;&lt; <span class="str">"\\na["</span> &lt;&lt; j &lt;&lt; <span class="str">"]="</span>;
        cout &lt;&lt; a[j++];
        afisare(n2 - <span class="num">1</span>);
    }
}</pre>
</div>


<div class="block">
  <h3>4.7. Problema 4 — Afișarea inversă a unui șir</h3>
  <p>Se citește un șir de caractere până la caracterul <code>0</code>. Se afișează inversat.</p>
<pre class="code"><span class="kw">void</span> invsir() {
    <span class="kw">char</span> ch;
    cin &gt;&gt; ch;
    <span class="kw">if</span> (ch != <span class="str">'0'</span>)
        invsir();
    cout &lt;&lt; ch;
}

<span class="kw">int</span> main() {
    cout &lt;&lt; <span class="str">"Introduceti textul="</span>;
    invsir();
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
  <div class="nota">Funcția citește un caracter, apoi se autoapelează — dar afișarea se face <strong>după</strong> autoapel, ceea ce produce ordinea inversă.</div>
</div>
`;


/* ============================================================
   SECTIUNEA 5 — SORTARI
   ============================================================ */
const SORTARI_HTML = `

<div class="block">
  <h3>5.1. Bubble Sort (sortare prin interschimbare)</h3>
  <p>Se parcurge vectorul comparând două elemente vecine. Dacă sunt în ordine greșită, se interschimbă. Se repetă până când nu mai e nevoie de nicio interschimbare.</p>
<pre class="code"><span class="cm">#include &lt;iostream&gt;</span>
<span class="kw">using namespace</span> std;
<span class="kw">int</span> v[<span class="num">25</span>], i, n, ok, aux;

<span class="kw">int</span> main() {
    cout &lt;&lt; <span class="str">"n="</span>; cin &gt;&gt; n;
    <span class="kw">for</span> (i = <span class="num">1</span>; i &lt;= n; i++) {
        cout &lt;&lt; <span class="str">"v["</span> &lt;&lt; i &lt;&lt; <span class="str">"]="</span>;
        cin &gt;&gt; v[i];
    }
    <span class="cm">// sortare crescatoare</span>
    <span class="kw">do</span> {
        ok = <span class="num">1</span>;
        <span class="kw">for</span> (i = <span class="num">1</span>; i &lt;= n-<span class="num">1</span>; i++)
            <span class="kw">if</span> (v[i] &gt; v[i+<span class="num">1</span>]) {
                aux = v[i];
                v[i] = v[i+<span class="num">1</span>];
                v[i+<span class="num">1</span>] = aux;
                ok = <span class="num">0</span>;
            }
    } <span class="kw">while</span> (ok != <span class="num">1</span>);

    <span class="kw">for</span> (i = <span class="num">1</span>; i &lt;= n; i++)
        cout &lt;&lt; v[i] &lt;&lt; <span class="str">" "</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>


<div class="block">
  <h3>5.2. Sortarea prin inserție</h3>
  <p>Elementele sunt împărțite în două liste: sortată și nesortată. La fiecare pas, primul element din lista nesortată este transferat în lista sortată, pe poziția care respectă ordinea crescătoare. Acest lucru se realizează prin deplasarea cu o poziție la dreapta a tuturor elementelor mai mari decât el.</p>
  <p><strong>Exemplu:</strong> pentru <code>a = (3, 2, 1, 6, 4)</code>:</p>
  <ul>
    <li>Pas 1: <code>(2, 3, 1, 6, 4)</code></li>
    <li>Pas 2: <code>(1, 2, 3, 6, 4)</code></li>
    <li>Pas 3: <code>(1, 2, 3, 6, 4)</code> (6 &gt; 3, nu se mută)</li>
    <li>Pas 4: <code>(1, 2, 3, 4, 6)</code></li>
  </ul>
<pre class="code"><span class="kw">for</span> (i = <span class="num">2</span>; i &lt;= n; i++)
    <span class="kw">if</span> (v[i] &lt; v[i-<span class="num">1</span>]) {
        x = v[i];
        j = i - <span class="num">1</span>;
        <span class="kw">while</span> (j &gt;= <span class="num">0</span> &amp;&amp; v[j] &gt; x) {
            v[j+<span class="num">1</span>] = v[j];
            j--;
        }
        v[j+<span class="num">1</span>] = x;
    }</pre>
</div>


<div class="block">
  <h3>5.3. Sortarea prin selecție</h3>
  <p>Fiecare element <code>v[i]</code> se compară cu toate cele aflate după el. Dacă se găsește un element mai mic, se interschimbă. Când <code>v[i]</code> și-a încheiat rolul de pivot, partea din vector până la el (inclusiv) este sortată crescător.</p>
<pre class="code"><span class="kw">int</span> v[<span class="num">25</span>], n, i, j, aux;

<span class="kw">int</span> main() {
    cout &lt;&lt; <span class="str">"nr de elemente="</span>;
    cin &gt;&gt; n;
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++) {
        cout &lt;&lt; <span class="str">"v["</span> &lt;&lt; i &lt;&lt; <span class="str">"]="</span>;
        cin &gt;&gt; v[i];
    }
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n-<span class="num">1</span>; i++)
        <span class="kw">for</span> (j = i+<span class="num">1</span>; j &lt; n; j++)
            <span class="kw">if</span> (v[i] &gt; v[j]) {
                aux = v[j];
                v[j] = v[i];
                v[i] = aux;
            }
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++)
        cout &lt;&lt; v[i] &lt;&lt; <span class="str">" "</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>


<div class="block">
  <h3>5.4. Sortarea prin numărare</h3>
  <p>Algoritmul găsește pentru fiecare element <code>A[i]</code> numărul de elemente din vector mai mici decât el. Numerele sunt memorate în alt vector <code>B</code>. Elementele lui <code>A</code> sunt salvate în vectorul auxiliar <code>C</code>. La final se rescriu în ordine crescătoare folosind <code>A[B[i]] = C[i]</code>.</p>
  <p><strong>Exemplu:</strong> pentru <code>A = (30, 20, 1, 6, 4)</code>:</p>
  <ul>
    <li>Pas 1: <code>C = (30, 20, 1, 6, 4)</code></li>
    <li>Pas 2: <code>B = (4, 3, 0, 2, 1)</code></li>
    <li>Pas 3: <code>A = (1, 4, 6, 20, 30)</code></li>
  </ul>
<pre class="code"><span class="kw">int</span> a[<span class="num">25</span>], b[<span class="num">25</span>], c[<span class="num">25</span>], n, i, j;

<span class="kw">int</span> main() {
    cin &gt;&gt; n;
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++) cin &gt;&gt; a[i];

    <span class="cm">// pas 1: copie a -> c</span>
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++) c[i] = a[i];

    <span class="cm">// pas 2: cate elemente mai mici are fiecare</span>
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++)
        <span class="kw">for</span> (j = i+<span class="num">1</span>; j &lt; n; j++)
            <span class="kw">if</span> (a[i] &lt; a[j]) b[j]++;
            <span class="kw">else</span>             b[i]++;

    <span class="cm">// pas 3: rescriere in ordine crescatoare</span>
    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++)
        a[b[i]] = c[i];

    <span class="kw">for</span> (i = <span class="num">0</span>; i &lt; n; i++) cout &lt;&lt; a[i] &lt;&lt; <span class="str">" "</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>
`;


/* ============================================================
   SECTIUNEA 6 — BACKTRACKING
   ============================================================ */
const BACK_HTML = `

<div class="block">
  <h3>6.1. Ce este backtracking-ul</h3>
  <p>Este o metodă folosită pentru problemele în care se cere <strong>afișarea tuturor soluțiilor</strong>, iar o soluție poate fi dată sub forma unui <strong>vector</strong>.</p>
  <p>Fiecare element al vectorului aparține unei mulțimi finite de elemente întregi, aflate într-o ordine bine stabilită.</p>
  <p><strong>De reținut:</strong></p>
  <ul>
    <li>Soluția se construiește <strong>pas cu pas</strong>, pornind de la primul element și adăugând la vector elementele următoare</li>
    <li>În caz de insucces, se <strong>revine</strong> la elementul anterior</li>
    <li>Elementul care trebuie adăugat se caută printre elementele care respectă restricțiile (condițiile interne)</li>
  </ul>
</div>


<div class="block">
  <h3>6.2. Exemple de probleme</h3>
  <p><strong>Permutările</strong> mulțimii cu n elemente. Pentru n=3:</p>
<pre class="code">1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1</pre>

  <p><strong>Aranjamentele</strong> de n elemente luate câte p. Pentru n=3, p=2:</p>
<pre class="code">1 2
1 3
2 1
2 3
3 1
3 2</pre>
</div>


<div class="block">
  <h3>6.3. Rutina principală</h3>
<pre class="code"><span class="kw">void</span> back() {
    k = <span class="num">1</span>;                  <span class="cm">// prima pozitie in vectorul solutie</span>
    Init(k);                <span class="cm">// initializare cu valoare de start</span>
    <span class="kw">while</span> (k &gt; <span class="num">0</span>) {
        <span class="kw">if</span> (Maisuntvalori(k) == <span class="num">1</span>) {
            sol[k]++;       <span class="cm">// inainteaza in vectorul solutie</span>
            <span class="kw">if</span> (E_valid(k))
                <span class="kw">if</span> (Solutie(k) == <span class="num">1</span>)
                    Tipar(k);   <span class="cm">// tipareste solutia</span>
                <span class="kw">else</span> {
                    k++;        <span class="cm">// urca un nivel</span>
                    Init(k);
                }
        }
        <span class="kw">else</span>
            k--;            <span class="cm">// coboara un nivel (backtrack)</span>
    }
}</pre>
</div>


<div class="block">
  <h3>6.4. Funcțiile auxiliare</h3>
  <ul>
    <li><strong>Init(k)</strong> — inițializează poziția k cu o valoare aflată <em>înaintea</em> primei valori posibile (pentru permutări: 0)</li>
    <li><strong>Maisuntvalori(k)</strong> — verifică dacă pe poziția k mai sunt valori netestate</li>
    <li><strong>E_valid(k)</strong> — verifică dacă noua valoare poate face parte dintr-o eventuală soluție</li>
    <li><strong>Solutie(k)</strong> — verifică dacă valoarea validă formează o soluție completă</li>
    <li><strong>Tipar(k)</strong> — tipărește vectorul soluție până la poziția k</li>
  </ul>

  <p style="margin-top:1rem;"><strong>Implementare pentru permutări:</strong></p>
<pre class="code"><span class="kw">void</span> Init(<span class="kw">int</span> k)         { sol[k] = <span class="num">0</span>; }

<span class="kw">int</span> Maisuntvalori(<span class="kw">int</span> k) {
    <span class="kw">if</span> (sol[k] &lt; n) <span class="kw">return</span> <span class="num">1</span>;
    <span class="kw">else</span>            <span class="kw">return</span> <span class="num">0</span>;
}

<span class="kw">int</span> E_valid(<span class="kw">int</span> k) {
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt; k; i++)
        <span class="kw">if</span> (sol[i] == sol[k]) <span class="kw">return</span> <span class="num">0</span>;
    <span class="kw">return</span> <span class="num">1</span>;
}

<span class="kw">int</span> Solutie(<span class="kw">int</span> k) {
    <span class="kw">if</span> (k == n) <span class="kw">return</span> <span class="num">1</span>;
    <span class="kw">else</span>        <span class="kw">return</span> <span class="num">0</span>;
}

<span class="kw">void</span> Tipar(<span class="kw">int</span> k) {
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt;= k; i++)
        cout &lt;&lt; sol[i] &lt;&lt; <span class="str">" "</span>;
    cout &lt;&lt; endl;
}</pre>
</div>


<div class="block">
  <h3>6.5. Problema: aranjamente de n luate câte p</h3>
  <p>Aceleași funcții ca la permutări, cu o singură modificare la funcția <code>Solutie</code>:</p>
<pre class="code"><span class="kw">int</span> Solutie(<span class="kw">int</span> k) {
    <span class="kw">if</span> (k == p) <span class="kw">return</span> <span class="num">1</span>;   <span class="cm">// p, nu n!</span>
    <span class="kw">else</span>        <span class="kw">return</span> <span class="num">0</span>;
}

<span class="kw">int</span> main() {
    cout &lt;&lt; <span class="str">"n="</span>; cin &gt;&gt; n;
    cout &lt;&lt; <span class="str">"p="</span>; cin &gt;&gt; p;
    back();
    cout &lt;&lt; <span class="str">"Sunt "</span> &lt;&lt; nrsol &lt;&lt; <span class="str">" solutii!"</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}</pre>
</div>


<div class="block">
  <h3>6.6. Problema: aranjarea corectă a n paranteze</h3>
  <p>Folosim valorile 0 (paranteză deschisă) și 1 (paranteză închisă). O configurație este validă dacă: în orice prefix sunt mai puține închise decât deschise, iar fiecare tip nu depășește n/2.</p>
<pre class="code"><span class="kw">void</span> Init(<span class="kw">int</span> k) { sol[k] = -<span class="num">1</span>; }

<span class="kw">int</span> Maisuntvalori(<span class="kw">int</span> k) {
    <span class="kw">if</span> (sol[k] &lt; <span class="num">1</span>) <span class="kw">return</span> <span class="num">1</span>;
    <span class="kw">else</span>            <span class="kw">return</span> <span class="num">0</span>;
}

<span class="kw">int</span> E_valid(<span class="kw">int</span> k) {
    <span class="kw">int</span> nr0 = <span class="num">0</span>, nr1 = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt;= k; i++)
        <span class="kw">if</span> (sol[i] == <span class="num">0</span>) nr0++;
        <span class="kw">else</span>             nr1++;
    <span class="kw">if</span> ((nr1 &gt; nr0) || (nr0 &gt; n/<span class="num">2</span>) || (nr1 &gt; n/<span class="num">2</span>))
        <span class="kw">return</span> <span class="num">0</span>;
    <span class="kw">return</span> <span class="num">1</span>;
}

<span class="kw">void</span> Tipar(<span class="kw">int</span> k) {
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt;= k; i++)
        <span class="kw">if</span> (sol[i] == <span class="num">1</span>) cout &lt;&lt; <span class="str">")"</span>;
        <span class="kw">else</span>             cout &lt;&lt; <span class="str">"("</span>;
    cout &lt;&lt; endl;
}</pre>
</div>
`;


/* ============================================================
   SECTIUNEA 7 — INTREBARI TEST
   ============================================================ */
const INTREBARI = [
  {
    q: "Care este lungimea în memorie a tipului <code>int</code> în C++?",
    opt: ["1 octet", "2 octeți", "4 octeți", "8 octeți"],
    ok: 2,
    exp: "Tipul int ocupă 4 octeți și are valori între -2 147 483 648 și 2 147 483 647."
  },
  {
    q: "De la ce indice începe indexarea unui vector în C++?",
    opt: ["0", "1", "depinde de declarare", "-1"],
    ok: 0,
    exp: "Indexarea începe de la 0. Vectorul declarat v[7] are elemente v[0], v[1], ..., v[6]."
  },
  {
    q: "Ce reprezintă operatorul <code>&amp;</code> aplicat unei variabile?",
    opt: [
      "ȘI logic",
      "Operatorul de adresare (referențiere)",
      "Operatorul modulo",
      "Negație logică"
    ],
    ok: 1,
    exp: "Operatorul & se numește operator de adresare (referențiere). Aplicat pe o variabilă, returnează adresa ei de memorie."
  },
  {
    q: "Care este definiția recursivă a lui n! pentru n &gt; 0?",
    opt: [
      "n!",
      "(n - 1)! · n",
      "n · n",
      "(n + 1)!"
    ],
    ok: 1,
    exp: "Definiția recursivă: n! = (n-1)! · n pentru n > 0, iar 0! = 1 prin convenție matematică."
  },
  {
    q: "În metoda backtracking, funcția <code>E_valid(k)</code> verifică:",
    opt: [
      "Dacă mai sunt valori netestate pe poziția k",
      "Dacă noua valoare poate face parte dintr-o eventuală soluție",
      "Dacă s-a format deja o soluție completă",
      "Dacă vectorul soluție este plin"
    ],
    ok: 1,
    exp: "E_valid verifică dacă valoarea pusă pe poziția k respectă restricțiile problemei și poate face parte dintr-o eventuală soluție."
  },
  {
    q: "Câte permutări are mulțimea {1, 2, 3}?",
    opt: ["3", "6", "9", "12"],
    ok: 1,
    exp: "Permutările mulțimii cu n elemente sunt n! La fel: 3! = 1·2·3 = 6 permutări."
  },
  {
    q: "Dacă <code>p</code> este pointer la o variabilă <code>x</code>, ce returnează expresia <code>*p</code>?",
    opt: [
      "Adresa lui p",
      "Adresa lui x",
      "Valoarea aflată la adresa memorată în p",
      "Numele variabilei x"
    ],
    ok: 2,
    exp: "Operatorul * (dereferențiere) aplicat pe un pointer returnează valoarea aflată la adresa memorată în pointer."
  },
  {
    q: "Ce face declarația <code>int v[7];</code>?",
    opt: [
      "Declară un vector cu 7 elemente: v[0] până la v[6]",
      "Declară un vector cu 8 elemente: v[0] până la v[7]",
      "Declară un vector cu indici de la 1 la 7",
      "Produce eroare de compilare"
    ],
    ok: 0,
    exp: "Vectorul v[7] are 7 elemente, indexate de la 0 la 6. Indexarea pornește de la 0 în C++."
  },
  {
    q: "În sortarea prin selecție, pentru fiecare i se caută:",
    opt: [
      "Elementul maxim din vector",
      "Elementul minim din porțiunea nesortată",
      "Mediana valorilor",
      "Ultimul element"
    ],
    ok: 1,
    exp: "Sortarea prin selecție: la fiecare pas se găsește minimul din porțiunea nesortată și se interschimbă cu primul element nesortat."
  },
  {
    q: "În metoda backtracking, funcția <code>Init(k)</code> inițializează poziția k cu:",
    opt: [
      "Prima valoare validă",
      "O valoare aflată ÎNAINTEA primei valori posibile",
      "Ultima valoare posibilă",
      "Mereu cu valoarea 1"
    ],
    ok: 1,
    exp: "Init pune o valoare aflată înaintea primei valori posibile. Pentru permutări, valoarea de start este 0, deoarece prima valoare posibilă este 1."
  },
  {
    q: "Care este operatorul „diferit de” în C++?",
    opt: ["<>", "!=", "/=", "ne"],
    ok: 1,
    exp: "În C++ operatorul „diferit de” este !=. Operatorul == verifică egalitatea."
  },
  {
    q: "Ce afișează codul: <code>int v[]={3,6,4}; cout&lt;&lt;v[1];</code>",
    opt: ["3", "6", "4", "Eroare"],
    ok: 1,
    exp: "Indexarea începe de la 0. v[0]=3, v[1]=6, v[2]=4. Deci v[1] este 6."
  }
];


/* ============================================================
   RANDARE — incarca continutul in fiecare sectiune
   ============================================================ */
document.getElementById("baza-content").innerHTML      = BAZA_HTML;
document.getElementById("tablouri-content").innerHTML  = TABLOURI_HTML;
document.getElementById("pointeri-content").innerHTML  = POINTERI_HTML;
document.getElementById("recursiv-content").innerHTML  = RECURSIV_HTML;
document.getElementById("sortari-content").innerHTML   = SORTARI_HTML;
document.getElementById("back-content").innerHTML      = BACK_HTML;


/* ============================================================
   QUIZ
   ============================================================ */
let qIdx = 0;
let scor = 0;
let qAnswered = false;

function renderQuiz() {
  const c = document.getElementById("quiz");

  if (qIdx >= INTREBARI.length) {
    c.innerHTML = `
      <div class="quiz-box q-final">
        <div class="q-count">Test terminat</div>
        <div class="score">${scor} / ${INTREBARI.length}</div>
        <p class="msg">${getMessage(scor)}</p>
        <button class="btn" id="restart">Reia testul</button>
      </div>`;
    document.getElementById("restart").addEventListener("click", () => {
      qIdx = 0; scor = 0; qAnswered = false;
      renderQuiz();
    });
    return;
  }

  const q = INTREBARI[qIdx];
  c.innerHTML = `
    <div class="quiz-box">
      <div class="q-count">Întrebarea ${qIdx + 1} din ${INTREBARI.length}</div>
      <div class="q-text">${q.q}</div>
      <div class="q-opts">
        ${q.opt.map((o, i) => `<button class="q-opt" data-i="${i}">${o}</button>`).join("")}
      </div>
      <div class="q-fb" id="q-fb"></div>
      <div class="q-controls">
        <span class="q-score">Scor curent: ${scor} / ${qIdx}</span>
        <button class="btn" id="q-next" style="display:none;">
          ${qIdx < INTREBARI.length - 1 ? "Următor →" : "Vezi rezultatul"}
        </button>
      </div>
    </div>`;

  qAnswered = false;

  c.querySelectorAll(".q-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      if (qAnswered) return;
      qAnswered = true;
      const i = parseInt(btn.dataset.i);

      c.querySelectorAll(".q-opt").forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.ok) b.classList.add("ok");
        else if (idx === i) b.classList.add("no");
      });

      if (i === q.ok) scor++;

      const fb = document.getElementById("q-fb");
      fb.classList.add("show");
      fb.innerHTML = (i === q.ok ? "<strong>Corect.</strong> " : "<strong>Greșit.</strong> ") + q.exp;
      document.getElementById("q-next").style.display = "inline-block";
    });
  });

  document.getElementById("q-next").addEventListener("click", () => {
    qIdx++;
    renderQuiz();
  });
}

function getMessage(s) {
  if (s === INTREBARI.length) return "Excelent! Stăpânești foarte bine materia.";
  if (s >= 10) return "Foarte bine! Recapitulează capitolele la care ai greșit.";
  if (s >= 7) return "Rezultat bun, dar mai ai de lucru.";
  if (s >= 5) return "Trebuie să exersezi mai mult.";
  return "Recapitulează teoria și încearcă din nou.";
}

renderQuiz();
